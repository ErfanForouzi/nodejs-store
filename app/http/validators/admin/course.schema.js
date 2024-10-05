const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../../utils/constants");
const createError = require("http-errors");

const createCourseSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createError.BadRequest("عنوان محصول معتبر نمیباشد")),
  text: Joi.string()
    .min(3)
    .max(30)
    .error(createError.BadRequest("متن محصول معتبر نمیباشد")),
  short_text: Joi.string()
    .min(3)
    .max(30)
    .error(createError.BadRequest("متن کوتاه محصول معتبر نمیباشد")),
  discount: Joi.number()
    .error(createError.BadRequest(" تخفیف  محصول معتبر نمیباشد")),
  price: Joi.number().empty()
    .error(createError.BadRequest(" عدد تخفیف محصول معتبر نمیباشد")),
  tags: Joi.array().min(0).max(20)
    .error(
      createError.BadRequest(
        "برچسب محصول نامعتبر و نمیتواند بیشتر از 20 مورد باشد"
      )
    ),
  filename: Joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.gif)$/).error(
    createError.BadRequest("تصویر محصول معتبر نمیباشد")
  ),
  category: Joi.string()
    .allow("")
    .pattern(MongoIDPattern)
    .error(createError.BadRequest("شناسه ارسال شده صحیح نمیباشد")),
    type: Joi.string().regex(/(free|cash|special)/i),
    fileUploadPath:Joi.allow(),
});

module.exports = {
  createCourseSchema,
};
