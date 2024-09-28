const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../../utils/constants");

const addCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی معتبر نمیباشد")),
  parent: Joi.string()
    .allow("")
    .pattern(MongoIDPattern)
    .error(new Error("شناسه ارسال شده صحیح نمیباشد")),
});

module.exports = {
    addCategorySchema,
};
