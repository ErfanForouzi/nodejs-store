const { Router } = require("express");
const { CategoryRoutes } = require("./category");

const router = Router();
/** 
 * @swagger
 * tags:
 *  name: Admin-Panel
 *  description: action of admin(add,edit,remove...)
 */
router.use('/category',CategoryRoutes)

module.exports = {
    AdminRoutes:router
}