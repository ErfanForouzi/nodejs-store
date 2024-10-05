
/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *              type: string
 *              enum:
 *                  -   free
 *                  -   cash
 *                  -   special
 */

/**
 * {
 * statusCode: 200,
 * data:{
 *  courses:[
 *      {},
 *      {},
 *      {}
 *  ]
 *  }
 * }
 */


/**
 * @swagger
 *  definitions:
 *      publicDefinition:
 *          type: object
 *          properties:
 *              statusCode:                 
 *                  type: integer
 *                  example: 20X
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: "the best message for that action"
 */


/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: integer
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string 
 *                                      example: "66f7d1a2ab8ce0db4f6ba41a" 
 *                                  title:
 *                                      type: string 
 *                                      example: "title for course"  
 *                                  text:
 *                                      type: string 
 *                                      example: "text for course" 
 *                                  short_text:
 *                                      type: string 
 *                                      example: "short text for course" 
 *                                  status:
 *                                      type: string 
 *                                      example: "notStarted|completed|holding" 
 *                                  time:
 *                                      type: string 
 *                                      example: "00:00:00" 
 *                                  price:
 *                                      type: string 
 *                                  discount:
 *                                      type: string 
 *                                      example: "66f7d1a2ab8ce0db4f6ba41a" 
 *                                  teacher:
 *                                      type: string 
 *                                      example: "erfan forouzi" 
 *                                  image:
 *                                      type: string 
 *                                      format: binary 
 *                                  type:
 *                                      $ref: '#/components/schemas/Types'
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *              properties:
 *                  id:
 *                      type: string
 *                      description: the id of course
 *                  title:
 *                      type: string
 *                      description: the title of chapter
 *                  text:
 *                      type: string
 *                      description: the text of chapter
 *          Insert-Course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   tags
 *                  -   category
 *                  -   image
 *                  -   text
 *                  -   short_text
 *                  -   price
 *                  -   discount
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for creating a course
 *                  tags:
 *                      type: array
 *                      description: the tags for creating a course
 *                  category:
 *                      type: string
 *                      description: the category for creating a course
 *                  image:
 *                      type: string
 *                      format: binary
 *                      description: image course for creating course
 *                  text:
 *                      type: string
 *                      description: the text for creating a course
 *                  short_text:
 *                      type: string
 *                      description: the short_text for creating a course
 *                  price:
 *                      type: string
 *                      description: the parent for creating a course
 *                  discount:
 *                      type: string
 *                      description: the discount for creating a course
 *                  type:
 *                      $ref: '#/components/schemas/Types' 
 */

/**
 * @swagger
 *  /admin/courses/list:
 *      get:
 *          tags:
 *              -   Course(Admin-Panel)
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: how to search in courses
 *          summary: get list of courses
 *          description: get list of courses with get request
 *          responses:
 *              200:
 *                  description: successfully get all courses
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */

/**
 * @swagger
 *  /admin/courses/add:
 *      post:
 *          tags:
 *              -   Course(Admin-Panel)
 *          summary: get list of courses
 *          description: get list of courses with get request
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Insert-Course'
 *          responses:
 *              200:
 *                  description: successfully get all courses
 */

/**
 * @swagger
 *  /admin/courses/{id}:
 *      get:
 *          tags:
 *              -   Course(Admin-Panel)
 *          summary: get one course
 *          description: get one course by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: successfully get one course
 */


/**
 * @swagger
 *  /admin/courses/add-chapter:
 *      put:
 *          tags:
 *              -   Course(Admin-Panel)
 *          summary: add chapter
 *          description: add chapter to a course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *          responses:
 *              200:
 *                  description: successfully created one chapter and  add it to course
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */