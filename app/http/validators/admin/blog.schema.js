const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../../utils/constants");
const createError = require("http-errors");

const createBlogSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createError.BadRequest("عنوان بلاگ معتبر نمیباشد")),
  text: Joi.string()
    .min(3)
    .max(30)
    .error(createError.BadRequest("متن بلاگ معتبر نمیباشد")),
  short_text: Joi.string()
    .min(3)
    .max(30)
    .error(createError.BadRequest("متن کوتاه بلاگ معتبر نمیباشد")),
  tags: Joi.array()
    .min(0)
    .max(20)
    .error(
      createError.BadRequest(
        "برچسب بلاگ نامعتبر و نمیتواند بیشتر از 20 مورد باشد"
      )
    ),
  filename: Joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.gif)$/).error(
    createError.BadRequest("تصویر بلاگ معتبر نمیباشد")
  ),
  category: Joi.string()
    .allow("")
    .pattern(MongoIDPattern)
    .error(createError.BadRequest("شناسه ارسال شده صحیح نمیباشد")),
    fileUploadPath:Joi.allow()
});

module.exports = {
    createBlogSchema,
};
