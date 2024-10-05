const { Schema, Types } = require("mongoose");

const CommentSchema = new Schema({
    user: { type: Types.ObjectId, required: true, ref: "user" },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: new Date().getTime() },
    parent: { type: Types.ObjectId,ref:"comment" },
  });

  module.exports = {
    CommentSchema
  }