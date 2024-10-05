/**
 * @swagger
 *  components:
 *      schemas:
 *          Color:
 *              type: array
 *              items:
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   yellow
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   tags
 *                  -   category
 *                  -   images
 *                  -   text
 *                  -   short_text
 *                  -   price
 *                  -   count
 *                  -   discount
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for creating a product
 *                  tags:
 *                      type: array
 *                      description: the tags for creating a product
 *                  category:
 *                      type: string
 *                      description: the category for creating a product
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  text:
 *                      type: string
 *                      description: the text for creating a product
 *                  short_text:
 *                      type: string
 *                      description: the short_text for creating a product
 *                  price:
 *                      type: string
 *                      description: the parent for creating a product
 *                  count:
 *                      type: string
 *                      description: the count for creating a product
 *                  discount:
 *                      type: string
 *                      description: the discount for creating a product
 *                  type:
 *                      type: string
 *                      description: the type of product 
 *                      example: virtual - physical
 *                  width:
 *                      type: string
 *                      description: the width for creating a product
 *                  height:
 *                      type: string
 *                      description: the height for creating a product
 *                  length:
 *                      type: string
 *                      description: the length for creating a product
 *                  weight:
 *                      type: string
 *                      description: the weight for creating a product
 *                  colors:
 *                      $ref: '#/components/schemas/Color' 
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Product:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for creating a product
 *                  tags:
 *                      type: array
 *                      description: the tags for creating a product
 *                  category:
 *                      type: string
 *                      description: the category for creating a product
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  text:
 *                      type: string
 *                      description: the text for creating a product
 *                  short_text:
 *                      type: string
 *                      description: the short_text for creating a product
 *                  price:
 *                      type: string
 *                      description: the parent for creating a product
 *                  count:
 *                      type: string
 *                      description: the count for creating a product
 *                  discount:
 *                      type: string
 *                      description: the discount for creating a product
 *                  width:
 *                      type: string
 *                      description: the width for creating a product
 *                  height:
 *                      type: string
 *                      description: the height for creating a product
 *                  length:
 *                      type: string
 *                      description: the length for creating a product
 *                  weight:
 *                      type: string
 *                      description: the weight for creating a product
 *                  type:
 *                      type: string
 *                      description: the type of product 
 *                      example: virtual - physical
 *                  colors:
 *                      $ref: '#/components/schemas/Color' 
 */

/**
 * @swagger
 *  /admin/products/list:
 *      get:
 *          tags: [Product(Admin-Panel)]
 *          summary: get all products
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: how to search
 *          responses:
 *              200:
 *                  description: get all products successfully
 */

/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [Product(Admin-Panel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: created new Product
 */


/**
 * @swagger
 *  /admin/products/{id}:
 *      get:
 *          tags: [Product(Admin-Panel)]
 *          summary: get product by id
 *          parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: sucessfully got one product
 */



/**
 * @swagger
 *  /admin/products/{id}:
 *      delete:
 *          tags: [Product(Admin-Panel)]
 *          summary: delete product by id
 *          parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: sucessfully deleted product by id
 */


/**
 * @swagger
 *  /admin/products/edit/{id}:
 *      patch:
 *          tags: [Product(Admin-Panel)]
 *          summary: get product by id
 *          parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              type: string
 *              description: id in path for edit
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Product'
 *          responses:
 *              200:
 *                  description: sucessfully edit one product
 */