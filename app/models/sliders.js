const { Schema, model } = require("mongoose");

const SliderSchema = new Schema(
  {
    title: { type: String },
    text: { type: String },
    image: { type: String,required: true },
    type: { type: String,default: "main" },
  },
  { timestamps: true }
);

const SliderModel = model("slider", SliderSchema);

module.exports = SliderModel;
