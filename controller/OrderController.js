import express from 'express';
import jwtdecode from 'jwt-decode';
import Auth from '../middleware/Auth';
import logger from '../config/Logger';
import ResponseDto from '../utils/ResponseDto'
const router = express.Router();
import OrderService from '../service/OrderService';

/**
 * @swagger
 * /order/save:
 *   post:
 *     tags:
 *       - Order
 *     name: Order save
 *     summary: Create Order
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Order'
 *           type: object
 *     responses:
 *       '200':
 *         description: Order Created successfully
 *       '403':
 *         description: No authorization / user not found
 */

/* PUT Save Order */
router.post('/order/save', (req, res) => {
	try {
		OrderService.saveOrder(req, res);
	} catch (error) {
		logger.error(error);
		res.status(417).json(error);
	}
});

/**
 * @swagger
 * /order/update:
 *   put:
 *     tags:
 *       - Order
 *     name: Product update
 *     summary: Update Product with id
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *       - name: id
 *         in: header
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Order'
 *           type: object
 *     responses:
 *       '200':
 *         description: Order updated successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '403':
 *         description: Username and password don't match
 */
/* Post Updata product */
router.put('/order/update', (req, res) => {
	try {
		ProductService.updateProduct(req, res);
	} catch (error) {
		logger.error(error);
		res.status(417).json(error);
	}
});

/**
 * @swagger
 * /order/list:
 *   get:
 *     tags:
 *       - Order
 *     name: Order list
 *     summary: Order list 
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         required:
 *           - x-access-token
 *     responses:
 *       '200':
 *         description: Order fetched successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '403':
 *         description: Username and password don't match
 */
/* GET Current user profile */
router.get('/product/list', /*Auth.isSuperAdmin,*/  (req, res) => {
	OrderService.getOrder(req, res);
});


/**
 * @swagger
 * /order/update_status:
 *   put:
 *     tags:
 *       - Order
 *     name: Order Status Update
 *     summary: Update Order Status
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *       - name: id
 *         in: header
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/OrderStatus'
 *           type: object
 *         required:
 *           - x-access-token
 *     responses:
 *       '200':
 *         description: Order status updated successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '403':
 *         description: Username and password don't match
 */
/* Update Order status */
router.put('/order/update_status', /*Auth.isSuperAdmin,*/  (req, res) => {
	ProductService.updateProductStatus(req, res);
});

module.exports = router;