import express from 'express';
import jwtdecode from 'jwt-decode';
import Auth from '../middleware/Auth';
import logger from '../config/Logger';
import ResponseDto from '../utils/ResponseDto'
const router = express.Router();

/**
 * @swagger
 * /product/save:
 *   post:
 *     tags:
 *       - Product
 *     name: product save
 *     summary: Create Product
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Product'
 *           type: object
 *     responses:
 *       '200':
 *         description: Product Created successfully
 *       '403':
 *         description: No authorization / user not found
 */
const ProductService = require('../service/ProductService')
/* PUT Save Product */
router.post('/product/save', (req, res, next) => {
	try {
		ProductService.saveProduct(req, res, next);
	} catch (error) {
		logger.error(error);
		res.status(417).json(error);
	}
});

/**
 * @swagger
 * /product/update:
 *   put:
 *     tags:
 *       - Product
 *     name: Product update
 *     summary: Update Product with id
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: header
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Product'
 *           type: object
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '403':
 *         description: Username and password don't match
 */
/* Post Updata product */
router.put('/product/update', (req, res) => {
	try {
		ProductService.updateProduct(req, res);
	} catch (error) {
		logger.error(error);
		res.status(417).json(error);
	}
});

/**
 * @swagger
 * /product/list:
 *   get:
 *     tags:
 *       - Product
 *     name: Product list
 *     summary: Product list 
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
 *         description: Product fetched successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '403':
 *         description: Username and password don't match
 */
/* GET Current user profile */
router.get('/product/list', /*Auth.isSuperAdmin,*/  (req, res) => {
	ProductService.getProduct(req, res);
})

module.exports = router;