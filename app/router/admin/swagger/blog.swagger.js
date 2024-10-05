
/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   category
 *                  -   image
 *                  -   tags
 *                  -   text
 *                  -   short_text
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for creating a category
 *                  category:
 *                      type: string
 *                      description: the category for creating a blog
 *                  image:
 *                      type: file
 *                      description: the image for creating a blog
 *                  tags:
 *                      type: string
 *                      description: the tags for creating a blog
 *                  text:
 *                      type: string
 *                      description: the text for creating a blog
 *                  short_text:
 *                      type: string
 *                      description: the short_text for creating a blog
 *          BlogUpdate:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for creating a category
 *                  category:
 *                      type: string
 *                      description: the category for creating a blog
 *                  image:
 *                      type: file
 *                      description: the image for creating a blog
 *                  tags:
 *                      type: string
 *                      description: the tags for creating a blog
 *                  text:
 *                      type: string
 *                      description: the text for creating a blog
 *                  short_text:
 *                      type: string
 *                      description: the short_text for creating a blog
 */


/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags:
 *              -   Blog(Admin-Panel)
 *          summary: get all blogs
 *          description: get all blogs
 *          responses:
 *              200:
 *                  description: successfully get all blogs
 */



/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags:
 *              -   Blog(Admin-Panel)
 *          summary: create new blog
 *          consumes:
 *              -   multipart/form-data
 *              -   application/x-www-form-urlencoded
 *          description: create new blog
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          responses:
 *              201:
 *                  description: successfully create new blog
 */


/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          tags:
 *              -   Blog(Admin-Panel)
 *          summary: get one blog by id
 *          description: get one blog by id 
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: successfully get one blog
 */



/**
 * @swagger
 *  /admin/blogs/{id}:
 *      delete:
 *          tags:
 *              -   Blog(Admin-Panel)
 *          summary: delete one blog by id
 *          description: get one blog by id 
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: delete one blog by id
 */



/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags:
 *              -   Blog(Admin-Panel)
 *          summary: update blog
 *          parameters:
 *          -   name: id
 *              in: path
 *              type: string
 *              required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/BlogUpdate'
 *          responses:
 *              201:
 *                  description: successfully create new blog
 */