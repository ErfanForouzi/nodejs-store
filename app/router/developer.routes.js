const { Router } = require("express");
const bcrypt = require("bcrypt");
const { RandomNumberGenerator } = require("../utils/functions");

const router = Router();


/**
 * @swagger
 *  tags:
 *      name: Developer-Routes
 *      description: Developer Utils
 *  
 */

/**
 * @swagger
 *  /developer/password-hash/{password}:
 *      get:
 *          tags:
 *              -   Developer-Routes
 *          summary: hash data with bcrypt
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: password
 *                  required: true
 *          responses:
 *              200:
 *                  description: sucess
 *                      
 */
router.get("/password-hash/:password", (req, res, next) => {
  const { password } = req.params;
  const salt = bcrypt.genSaltSync(10);
  return res.send(bcrypt.hashSync(password, salt));
});
/**
 * @swagger
 *  /developer/random-number:
 *      get:
 *          tags:
 *              -   Developer-Routes
 *          summary: get random number
 *          responses:
 *              200:
 *                  description: sucess
 *                      
 */
router.get("/random-number", (req, res, next) => {
  return res.send(RandomNumberGenerator().toString());
});

module.exports = {
  DeveloperRoutes: router,
};


