const path = require("path");
const fs = require("fs");

const ProductModel = require("../../../models/products");
const {
  createProductSchema,
} = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const {
  returnListOfImagesFromRequest,
  copyObject,
  setFeatures,
  deleteInvalidPropertyInObject,
} = require("../../../utils/functions");
const { ObjectValidatorId } = require("../../validators/public.schema");
const createHttpError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");



const ProductBlackList = Object.freeze({
  WIDTH:"width",
  HEIGHT:"height",
  LENGTH:"length",
  WEIGHT:"weight",
  COLORS:"colors",
  LIKES:"likes",
  DESLIKES:"deslikes",
  BOOKMARKS:"bookmarks",
  COMMENTS:"comments",
  SUPPLIER:"supplier",
})

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const productBodyData = await createProductSchema.validateAsync(req.body);
      const images = returnListOfImagesFromRequest(
        req.files || [],
        req.body.fileUploadPath
      );
      images.forEach((img) =>
        path.join(__dirname, "..", "..", "..", "..", "public", img)
      );
      const supplier = req.user._id;
      let features = setFeatures(req.body);
      const {
        title,
        text,
        short_text,
        category,
        count,
        discount,
        price,
        tags,
        type,
      } = productBodyData;
      const product = await ProductModel.create({
        title,
        text,
        short_text,
        category,
        count,
        discount,
        price,
        tags,
        features,
        type,
        supplier,
        images,
      });

      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: "محصول شما با موفقیت ثبت شد",
          product,
        },
      });
    } catch (error) {
      console.log(error);
      const images = returnListOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );
      images.forEach((img) =>
        fs.unlinkSync(
          path.join(__dirname, "..", "..", "..", "..", "public", img)
        )
      );
      next(error);
    }
  }
  async editProduct(req, res, next) {
    try {
      const data = copyObject(req.body);
      const { id } = req.params;
      const productBeforeUpdate = await this.findProductById(id);

      if (req?.files?.length > 0) {
        productBeforeUpdate.images.forEach((img) =>
          fs.unlinkSync(
            path.join(__dirname, "..", "..", "..", "..", "public", img)
          )
        );
        const images = returnListOfImagesFromRequest(
          req?.files || [],
          req?.body.fileUploadPath
        );
        images.forEach((img) =>
          path.join(__dirname, "..", "..", "..", "..", "public", img)
        );
        data.images = images;
      }

      data.features = setFeatures(req.body);

      const blackList = Object.values(ProductBlackList)
      deleteInvalidPropertyInObject(data,blackList);

      const updatedResult = await ProductModel.updateOne(
        { _id: productBeforeUpdate._id },
        { $set: data }
      );

      if (updatedResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("مشکل سرور در ویرایش محصول");
      return res
        .status(HttpStatus.OK)
        .json({
          statusCode: HttpStatus.OK,
          data: { message: "محصول شما با موفقیت ویرایش شد" },
        });
    } catch (error) {
      const images = returnListOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );
      images.forEach((img) =>
        fs.unlinkSync(
          path.join(__dirname, "..", "..", "..", "..", "public", img)
        )
      );
      next(error);
    }
  }
  async getAllProducts(req, res, next) {
    try {
      const search = req?.query?.search || "";
      let products;
      if (search) {
        console.log("slaam");
        products = await ProductModel.find({
          $text: {
            $search: new RegExp(search, "gi"),
          },
        });
      } else {
        products = await ProductModel.find({});
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          products,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          product,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      const productDeleteResult = await ProductModel.deleteOne({
        _id: product._id,
      });
      if (productDeleteResult.deletedCount == 0)
        throw createHttpError.InternalServerError("خطا سرور در حذف محصول");
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: { message: "محصول مورد نظر با موفقیت حذف شد" },
      });
    } catch (error) {
      next(error);
    }
  }
  async findProductById(productID) {
    const { id } = await ObjectValidatorId.validateAsync({ id: productID });
    const product = await ProductModel.findById(id);
    if (!product) throw createHttpError.NotFound("محصول مورد نظر یافت نشد");
    return product;
  }
}
module.exports = {
  AdminProductController: new ProductController(),
};
