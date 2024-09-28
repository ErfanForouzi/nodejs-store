const { Router } = require("express");
const { CategoryController } = require("../../http/controllers/admin/category.controller");

const router = Router();


/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          summary: create category
 *          description: create new category with title and parent 
 *          tags:
 *              -   Admin-Panel
 *          parameters:
 *          -   name: title
 *              description: title for category
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: parent
 *              description: parent for category if has
 *              in: formData
 *              required: false
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 */
router.post("/add",CategoryController.addCategory);

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags:
 *              -   Admin-Panel  
 *          summary: get All parents of category
 *          description: get all parents of category for admin
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/parents",CategoryController.getAllParents)
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags:
 *              -   Admin-Panel  
 *          summary: get children
 *          description: get all children of category parents
 *          parameters:
 *          -   name: parent
 *              in: path
 *              type: string
 *              required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/children/:parent",CategoryController.getChildOfParents)


/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags:
 *              -   Admin-Panel  
 *          summary: get all categories
 *          description: get all categories with children
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/all",CategoryController.getAllCategories)

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags:
 *              -   Admin-Panel  
 *          summary: delete  category
 *          description: delete  category by id
 *          parameters:
 *          -   name: id
 *              in: path
 *              type: string
 *              required: true
 *              description: id should be objectId
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/remove/:id",CategoryController.removeCategory)

module.exports = {
    CategoryRoutes:router
}