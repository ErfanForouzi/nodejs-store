const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, lowercase: true },
    mobile: { type: String, required: true },
    email: { type: String, lowercase: true },
    password: { type: String },
    otp: {
      type: Object,
      default: {
        code: 0,
        expiresIn: 0,
      },
    },
    birthDay: { type: String },
    discount: { type: Number, default: 0 },
    bills: { type: [], default: [] },
    roles: { type: [String], default: ["USER"] },
  },
  { timestamps: true }
);

const UserModel = model("user", UserSchema);

module.exports = UserModel;
