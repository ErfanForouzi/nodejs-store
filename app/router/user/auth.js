const { Router } = require("express");
const authController = require("../../http/controllers/user/auth/auth.controller");

const router = Router();
/** 
 * @swagger
 * tags:
 *  name: UserAuthentication
 *  description: UserAuthentication Page and Routes
 */

/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          summary: login user in userpanel with mobile number
 *          description: one time password(OTP) login
 *          tags:
 *              -   UserAuthentication
 *          parameters:
 *          -   name: mobile
 *              description: persian mobile number
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internal server error
 */



router.post("/get-otp",authController.getOtp)
router.post("/check-otp",authController.checkOtp)
router.post("/refresh-token",authController.refreshToken)
/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          summary: send refresh token and get new refresh token
 *          description: fresh token
 *          tags:
 *              -   UserAuthentication
 *          parameters:
 *          -   in: formData
 *              name: refreshToken
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internal server error
 */



/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          summary: check-otp value in user controller
 *          description: check one time password(OTP) with mobile and code and expires date 
 *          tags:
 *              -   UserAuthentication
 *          parameters:
 *          -   name: mobile
 *              description: persian mobile number
 *              in: formData
 *              type: string
 *          -   name: code
 *              description: enter sms code received
 *              in: formData
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              500:
 *                  description: internal server error
 */

module.exports = {
    UserAuthRoutes:router
}