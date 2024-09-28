const Controller = require("../../controller");
const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../validators/user/auth.schema");
const createError = require("http-errors");
const UserModel = require("../../../../models/users");
const {
  RandomNumberGenerator,
  SignAccessToken,
  VerifyRefreshToken,
  SignRefreshToken,
} = require("../../../../utils/functions");
const { ROLES } = require("../../../../utils/constants");

class UserAuthController extends Controller {
  constructor() {
    super();
  }
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = RandomNumberGenerator();
      const result = await this.saveUser(mobile, code);
      if (!result) {
        throw createError.Unauthorized("ورود شما انجام نشد");
      }
      return res.status(200).json({
        message: "کد یک بار مصرف با موفقیت برای شما ارسال شد",
        code,
        mobile,
        statusCode: 200,
      });
    } catch (err) {
      next(createError.BadRequest(err.message));
    }
  }
  async checkOtp(req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body);
      const { mobile, code } = req.body;
      const user = await UserModel.findOne({ mobile });
      if (!user) throw createError.NotFound("کاربر مورد نظر یافت نشد");
      if (user?.otp?.code != code)
        throw createError.Unauthorized("کد یک بار مصرف وارد شده اشتباه میباشد");
      const now = Date.now();
      if (+user?.otp?.expiresIn < now) {
        throw createError.Unauthorized(
          "زمان استفاده از کد یک بار مصرف شما به پایان رسیده است"
        );
      }
      const accessToken = await SignAccessToken(user._id);
      const refreshToken = await SignRefreshToken(user._id);

      return res.json({
        data: { accessToken,refreshToken },
      });
    } catch (err) {
      next(err);
    }
  }
  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const mobile = await VerifyRefreshToken(refreshToken);
      const user = await UserModel.findOne({ mobile });
      const accessToken = await SignAccessToken(user._id);
      const newRefreshToken = await SignRefreshToken(user._id);
      return res.json({
        data:{
          accessToken,
          refreshToken:newRefreshToken
        }
      })
    } catch (error) {
      next(error);
    }
  }
  async saveUser(mobile, code) {
    const result = await this.checkExistUser(mobile);
    const user = await UserModel.findOne({mobile});
    const now  = Date.now();
    let otp = {
      code,
      expiresIn:  Date.now() + 1 * 1000 * 60 * 2,
    };
    if(+user?.otp?.expiresIn > now){
      throw createError.BadRequest("کد یک بار مصرف شما هنوز اعتبار دارد")
    }
    if (result) {
      return this.updateUser(mobile, { otp });
    }
    const newUser = await UserModel.create({
      mobile,
      otp,
      roles: [ROLES.USER],
    });
    return !!newUser;
  }
  async checkExistUser(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }
  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", "0", null, NaN, undefined, 0].includes(objectData[key])) {
        delete objectData[key];
      }
    });
    const updateResult = await UserModel.updateOne(
      { mobile },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
}
module.exports = new UserAuthController();
