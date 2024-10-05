const { Router } = require("express");
const { AdminProductController } = require("../../http/controllers/admin/product.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToArray");

const router = Router();


router.get("/list",AdminProductController.getAllProducts);
router.post("/add",uploadFile.array("images",10),stringToArray("tags"),AdminProductController.addProduct);
router.get("/:id",AdminProductController.getOneProductById);
router.delete("/:id",AdminProductController.removeProduct);
router.patch("/edit/:id",uploadFile.array("images",10),stringToArray("tags"),AdminProductController.editProduct);




module.exports = {
    AdminApiProductRoutes:router
}