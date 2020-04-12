const express = require('express');
const router = express.Router();

/**
*   @swagger
*   definitions:
*       Role:
*           properties:
*               role:
*                   type: string
*                   enum:
*                       - ROLE_SUPER_ADMIN
*                       - ROLE_ADMIN
*                       - ROLE_MERCHANT
*                       - ROLE_USER
*/

/**
*   @swagger
*   definitions:
*       Status:
*           properties:
*               role:
*                   type: string
*                   enum:
*                       - ACTIVE
*                       - INACTIVE
*                       - DEACTIVE
*                       - UNVERIFIED
*/

/**
*   @swagger
*   definitions:
*       OrderStatus:
*           properties:
*               status:
*                   type: string
*                   enum:
*                       - PLACED
*                       - PROCESSING
*                       - DELIVERED
*                       - CANCELLED
*/


/**
 * @swagger
 * definitions:
 *   Test:
 *     properties:
 *       name:
 *         type: string
 *       breed:
 *         type: string
 *         description: 'Enter breed'
 *       age:
 *         type: integer
 *         description: 'Enter age'
 *       role:
 *         type: array
 *         items:
 *           type: integer
 *       snap:
 *         type: string
 *         enum:
 *           - ASC
 *           - DESC
 */


 /**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *         description: 'Last Name'
 *       username:
 *         type: string
 *         description: 'Enter username(unique)'
 *       password:
 *         type: string
 *         description: 'Enter secure password'
 *       role:
 *         type: array
 *         items:
 *           type: string
 *           enum:
 *           - ROLE_SUPER_ADMIN
 *           - ROLE_ADMIN
 *           - ROLE_MERCHANT
 *           - ROLE_USER
 */

/**
 * @swagger
 * definitions:
 *   Category:
 *     properties:
 *       name:
 *         type: string
 *       status:
 *         type: string
 *         enum:
 *           - ACTIVE
 *           - INACTIVE
 *           - DEACTIVE
 *       parent:
 *         type: string
 *         description: 'Enter parent category id'
 */

/**
 * @swagger
 * definitions:
 *   AtrributeDetails:
 *     properties:
 *       name:
 *         type: string
 *       price:
 *         type: number
 *         description: 'Price of attribute'
 */

/**
 * @swagger
 * definitions:
 *   Attributes:
 *     properties:
 *       name:
 *         type: string
 *       details:
 *         type: array
 *         items:
 *           $ref: '#/definitions/AtrributeDetails'
 */

 /**
 * @swagger
 * definitions:
 *   Product:
 *     properties:
 *       name:
 *         type: string
 *       price:
 *         type: integer
 *       quantity:
 *         type: integer
 *       images:
 *         type: array
 *         items:
 *           type: string
 *       description:
 *         type: string
 *       category:
 *         type: string
 *       attributes:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Attributes'
 */

/**
*   @swagger
*   definitions:
*       Order:
*           properties:
*               price:
*                   type: integer
*               quantity:
*                   type: integer
*               customer:
*                   type: object
*                   properties:
*                       name:
*                           type: string
*                       mobileNo:
*                           type: string
*               description:
*                   type: string
*               address:
*                   type: object
*                   properties:
*                       street:
*                           type: string
*                           example: '123 Street MainLand'
*                       district:
*                           type: string
*                       location:
*                           type: string
*               products:
*                   type: array
*                   items:
*                       type: object
*                       properties:
*                           name:
*                               type: string
*                           attributes:
*                               type: array
*                               items:
*                                       $ref: '#/definitions/Attributes'
*/

module.exports = router;
