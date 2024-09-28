const { Schema, model, Types } = require("mongoose");

const CategorySchema = new Schema({
  title: { type: String, required: true },
  parent: { type: Types.ObjectId, default: undefined },
});

const CategoryModel = model("category", CategorySchema);

module.exports = CategoryModel;

