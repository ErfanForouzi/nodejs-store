const { Schema, model, Types } = require("mongoose");

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    total_desc: { type: String, required: true },
    short_desc: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: { type: Types.ObjectId, required: true },
    comments: { type: [], default: [] },
    like: { type: [Types.ObjectId], default: [] },
    deslike: { type: [Types.ObjectId], default: [] },
    bookmark: { type: [Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String, required: true },
    time: { type: String },
    format: { type: String },
    teacher: { type: Types.ObjectId, required: true },
    features: {
      type: Object,
      default: {
        width: "",
        height: "",
        length: "",
        weight: "",
        color: [],
        model: [],
        madein: "",
      },
    },
  },
  { timestamps: true }
);

const ProductModel = model("Product", ProductSchema);

module.exports = ProductModel;
