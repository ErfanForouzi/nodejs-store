const path = require("path");
const fs = require("fs");

const { createBlogSchema } = require("../../validators/admin/blog.schema");
const BlogModel = require("../../../models/blogs");
const createError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");

const { deleteInvalidPropertyInObject } = require("../../../utils/functions");
const Controller = require("../controller");

const BlogBlackList = Object.freeze({
  LIKES: "likes",
  COMMENTS: "comments",
  BOOKMARKS: "bookmarks",
  DESLIKES: "deslikes",
  AUTHOR: "author",
});

class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      const blogDataBody = await createBlogSchema.validateAsync(req.body);
      const { filename, fileUploadPath } = blogDataBody;
      req.body.image = path.join(fileUploadPath, filename);
      req.body.image = req.body.image.replace(/\\/g, "/");
      const image = req.body.image;
      const { title, text, short_text, category, tags } = blogDataBody;
      const author = req.user._id;
      const blog = await BlogModel.create({
        title,
        text,
        short_text,
        category,
        image,
        tags,
        author,
      });
      return res
        .status(HttpStatus.CREATED)
        .json({
          statusCode: HttpStatus.CREATED,
          data:{
            message: "بلاگ شما با موفقیت ساخته شد",
          }
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
  async getOneBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlog(id);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          blog,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getListOfBlogs(req, res, next) {
    try {
      const blogs = await BlogModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $match: {},
        },
        {
          $unwind: "$author",
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $match: {},
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            "author.__v": 0,
            "author.otp": 0,
            "author.discount": 0,
            "author.roles": 0,
            "author.bills": 0,
            "category.__v": 0,
          },
        },
      ]);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          blogs,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteBlogById(req, res, next) {
    try {
      const { id } = req.params;
      await this.findBlog(id);
      const deleteBlogResult = await BlogModel.deleteOne({ _id: id });
      if (deleteBlogResult.deletedCount == 0)
        throw createError.InternalServerError("مشکل در سمت سرور");
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: { message: "بلاگ مورد نظر با موفقیت حذف شد" },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blogBeforeUpdate = await this.findBlog(id);
      if (req?.body?.fileUploadPath && req?.body?.filename) {
        fs.unlinkSync(
          path.join(
            __dirname,
            "..",
            "..",
            "..",
            "..",
            "public",
            blogBeforeUpdate.image
          )
        );
        const { fileUploadPath, filename } = req.body;
        req.body.image = path.join(fileUploadPath, filename);
        req.body.image = req.body.image.replace(/\\/g, "/");
      }
      let data = req.body;
      const blackList = Object.values(BlogBlackList);
      deleteInvalidPropertyInObject(data, blackList);

      const updateResult = await BlogModel.updateOne(
        { _id: id },
        { $set: data }
      );
      if (updateResult.modifiedCount == 0)
        throw createError.InternalServerError("خطای سرور در به روزرسانی بلاگ");
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
       data:{ message: "بلاگ شما با موفقیت به روزرسانی شد",}
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
      console.log(req.body);
      next(error);
    }
  }
  async findBlog(id) {
    try {
      const blog = await BlogModel.findById(id).populate([
        { path: "category", select: ["title"] },
        {
          path: "author",
          select: ["mobile", "first_name", "last_name", "username"],
        },
      ]);
      if (!blog) throw createError.NotFound("بلاگ یافت نشد");
      return blog;
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  AdminBlogController: new BlogController(),
};
