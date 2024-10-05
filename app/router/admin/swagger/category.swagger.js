/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for creating a category
 *                  parent:
 *                      type: string
 *                      description: the parent for creating a category
 */

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          summary: create category
 *          description: create new category with title and parent 
 *          tags:
 *              -   Category(Admin-Panel)
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              201:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags:
 *              -   Category(Admin-Panel)  
 *          summary: get All parents of category
 *          description: get all parents of category for admin
 *          responses:
 *              200:
 *                  description: success
 */


/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags:
 *              -   Category(Admin-Panel)  
 *          summary: get children of specific parent
 *          description: get all children of specific category 
 *          parameters:
 *          -   name: parent
 *              in: path
 *              type: string
 *              required: true
 *          responses:
 *              200:
 *                  description: success
 */


/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags:
 *              -   Category(Admin-Panel)  
 *          summary: get all categories
 *          description: get all categories with children
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags:
 *              -   Category(Admin-Panel)  
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



/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags:
 *              -   Category(Admin-Panel)  
 *          summary: get all categories without populate
 *          description: get all categories without populate
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger


/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags:
 *              -   Category(Admin-Panel)  
 *          summary: get  category by id
 *          description: get special category by id
 *          parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *              description: id should be objectId
 *          responses:
 *              200:
 *                  description: successfully get one category with children
 */


/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags:
 *              -   Category(Admin-Panel)  
 *          summary: get  category by id
 *          description: get special category by id
 *          parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *              description: id should be objectId
 *          -   in: formData
 *              name: title
 *              type: string
 *              required: true
 *              description: new title
 *          responses:
 *              200:
 *                  description: successfully updated one category title
 */