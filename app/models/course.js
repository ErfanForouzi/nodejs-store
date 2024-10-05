const { Schema, model, Types } = require("mongoose");
const { CommentSchema } = require("./public.shema");

const Episodes = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, default: "free" },
  time: { type: String, required: true },
});
const Chapter = new Schema({
  title: { type: String, required: true },
  text: { type: String, default: "" },
  episodes: { type: [Episodes], default: [] },
});

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    short_text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: Types.ObjectId, required: true, ref: "category" },
    comments: { type: [CommentSchema], default: [] },
    likes: { type: [Types.ObjectId], default: [] },
    deslikes: { type: [Types.ObjectId], default: [] },
    bookmarks: { type: [Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    time: { type: String, default: "00:00:00" },
    type: { type: String, required: true, default: "free" }, //free-cash-special
    teacher: { type: Types.ObjectId, required: true, ref: "user" },
    chapters: { type: [Chapter], default: [] },
    students: { type: [Types.ObjectId], default: [], ref: "user" },
    status:{type:String,default:"notStarted"} //notStarted-completed-holding
  },
  { timestamps: true }
);

CourseSchema.index({title:"text",text:"text",short_text:"text"})

const CourseModel = model("course", CourseSchema);

module.exports = CourseModel;
