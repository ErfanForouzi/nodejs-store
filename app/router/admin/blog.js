const { Router } = require("express");
const { AdminBlogController } = require("../../http/controllers/admin/blog.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToArray");

const router = Router();


router.get("/",AdminBlogController.getListOfBlogs);
router.post("/add",uploadFile.single("image"),stringToArray("tags"),AdminBlogController.createBlog);
router.get("/:id",AdminBlogController.getOneBlogById);
router.delete("/:id",AdminBlogController.deleteBlogById);
router.patch("/update/:id",uploadFile.single("image"),stringToArray("tags"),AdminBlogController.updateBlogById);



module.exports =  {
    AdminApiBlogRoutes:router
}