const { Router } = require("express");
const {
  AdminCourseController,
} = require("../../http/controllers/admin/course.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToArray");

const router = Router();


router.get("/list", AdminCourseController.getListOfCourses);
router.post(
  "/add",
  uploadFile.single("image"),
  stringToArray("tags"),
  AdminCourseController.addCourse
);
router.get(
    "/:id",
    AdminCourseController.getCourseById
  );

router.put("/add-chapter",AdminCourseController.addChapter);

  module.exports = {
    AdminApiCourseRoutes: router,
  };
  


