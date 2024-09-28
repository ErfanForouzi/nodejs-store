const { Router } = require("express");
const { HomeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");
const { DeveloperRoutes } = require("./developer.routes");
const { AdminRoutes } = require("./admin/admin.routes");

const router = Router();


router.use("/",HomeRoutes)
router.use("/user",UserAuthRoutes)
router.use("/admin",AdminRoutes)
router.use("/developer",DeveloperRoutes)

module.exports = {
    AllRoutes:router
}