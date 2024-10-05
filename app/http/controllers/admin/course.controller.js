const path = require("path");
const fs = require("fs");

const CourseModel = require("../../../models/course");
const Controller = require("../controller");

const { StatusCodes: HttpStatus } = require("http-status-codes");
const { createCourseSchema } = require("../../validators/admin/course.schema");
const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");

class CourseController extends Controller {
  async getListOfCourses(req, res, next) {
    try {
      let courses;
      const search = req.query.search;
      if (search) {
        courses = await CourseModel.find({
          $text: { $search: new RegExp(/search/, "gi") },
        }).sort({ _id: -1 });
      } else {
        courses = await CourseModel.find({}).sort({ _id: -1 });
      }
      return res
        .status(HttpStatus.OK)
        .json({ statusCode: HttpStatus.OK, data: { courses } });
    } catch (error) {
      next(error);
    }
  }
  async addCourse(req, res, next) {
    try {
      await createCourseSchema.validateAsync(req.body);
      const { filename, fileUploadPath } = req.body;
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const { title, text, short_text, category, price, discount, tags, type } =
        req.body;
      const teacher = req.user._id;
      if (Number(price) > 0 && type === "free") {
        throw createHttpError.BadRequest(
          "برای دوره رایگان نمیتوان قیمت ثبت کرد"
        );
      }
      const course = await CourseModel.create({
        title,
        text,
        short_text,
        category,
        price,
        discount,
        tags,
        image,
        time: "00:00:00",
        status: "notStarted",
        teacher,
        type,
      });
      if (!course?._id)
        throw createHttpError.InternalServerError("خطا سرور در ساخت دوره");
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: { message: "دوره شما با موفقیت ساخته شد" },
      });
    } catch (error) {
      const { filename, fileUploadPath } = req.body;
      fs.unlinkSync(
        path.join(
          __dirname,
          "..",
          "..",
          "..",
          "..",
          "public",
          fileUploadPath,
          filename
        )
      );
      next(error);
    }
  }
  async getCourseById(req, res, next) {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id))
        throw createHttpError.NotAcceptable("شناسه دوره مورد نظر یافت نشد");
      const course = await CourseModel.findById(id);
      if (!course) throw createHttpError.NotFound("دوره مورد نظر یافت نشد");
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          course,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async addChapter(req, res, next) {
    try {
      const { id, title, text } = req.body;
      const course = await this.findCourseById(id);
      const addChapterToCourseResult = await CourseModel.updateOne(
        { _id: id },
        {
          $push: {
            chapters: { title, text, episodes: [] },
          },
        }
      );
      if (addChapterToCourseResult.modifiedCount == 0)
        throw createHttpError.InternalServerError(
          "خطا درافزودن یک فصل به دوره"
        );
      return res
        .status(HttpStatus.OK)
        .json({
          statusCode: HttpStatus.OK,
          data: { message: "فصل مورد نظر با موفقیت به دوره شما افزوده شد" },
        });
    } catch (error) {
      next(error);
    }
  }
  async findCourseById(id) {
    if (!isValidObjectId(id))
      throw createHttpError.NotAcceptable("شناسه شما معتبر نمیباشد");
    const course = await CourseModel.findById(id);
    if (!course) throw createHttpError.NotFound("دوره مورد نظر یافت نشد");
    return course;
  }
}
module.exports = {
  AdminCourseController: new CourseController(),
};
