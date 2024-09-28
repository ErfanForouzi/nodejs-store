const Joi = require("@hapi/joi");
const getOtpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .required()
    .pattern(/^09\d{9}$/)
    .error(new Error("شماره موبایل وارد شده صحیح نمیباشد")),
});
const checkOtpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .required()
    .pattern(/^09\d{9}$/)
    .error(new Error("شماره موبایل وارد شده صحیح نمیباشد")),
    code:Joi.string().required().min(4).max(6).error(new Error("کد وارد شده صحیح نمیباشد"))
});

module.exports = {
  getOtpSchema,
  checkOtpSchema
};
