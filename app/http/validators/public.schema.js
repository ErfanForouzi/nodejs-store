const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../utils/constants");
const createHttpError = require("http-errors");

const ObjectValidatorId = Joi.object({
    id:Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest("شناسه وارد شده معتبر نمیباشد"))
});

module.exports = {
    ObjectValidatorId,
};
