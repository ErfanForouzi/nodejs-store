const { Router } = require("express");
const homeController = require("../../http/controllers/api/home.controller");
const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

const router = Router();
/** 
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: Index Page and Routes
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags:
 *          -   IndexPage
 *      description: get all need data  for index page
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              example: Bearer yourToken
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: not found
 */

router.get("/",VerifyAccessToken,homeController.indexPage)

module.exports = {
    HomeRoutes:router
}