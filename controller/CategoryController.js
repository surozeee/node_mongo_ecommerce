import express from 'express';
import jwtdecode from 'jwt-decode';
import Auth from '../middleware/Auth';
import logger from '../config/Logger';
import ResponseDto from '../utils/ResponseDto'
const router = express.Router();
import CategorySchema from '../models/CategorySchema';
import CustomError from '../error/CustomError';

/**
 * @swagger
 * /save_category:
 *   put:
 *     tags:
 *       - Category
 *     name: Save Category
 *     summary: Save Category
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
 *           $ref: '#/definitions/Category'
 *           type: object
 *     responses:
 *       '200':
 *         description: Category Saved
 *       '403':
 *         description: No authorization / user not found
 */
const categoryService = require('../service/CategoryService')
/* PUT save category */
router.put('/save_category', async (req, res, next) => {
	//throw new CustomError('AUTH001');
	try {
		// logger.debug('before call');
		// const category = await CategorySchema.findOne({name: 'string1'});
		// logger.debug('after call');
		// if(category){
		// 	throw new CustomError('USR001');
		// }
		// logger.debug('after call success')
		categoryService.saveCategory(req, res, next);
	} catch (error) {
		logger.error(error);
		res.status(417).json(error);
	}
});

/**
 * @swagger
 * /update_category:
 *   post:
 *     tags:
 *       - Category
 *     name: Category update
 *     summary: Update Category
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
 *           $ref: '#/definitions/Category'
 *           type: object
 *     responses:
 *       '200':
 *         description: User found and logged in successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '403':
 *         description: Username and password don't match
 */
/* POST User login */
router.post('/update_category', (req, res) => {
	try {
		categoryService.updateCategory(req, res);
	} catch (error) {
		logger.error(error);
		res.status(417).json(error);
	}
});

/**
 * @swagger
 * /get_active_categories:
 *   get:
 *     tags:
 *       - Category
 *     name: Get categories
 *     summary: Get active categories list
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
 *         description: User found and logged in successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '403':
 *         description: Username and password don't match
 */
/* GET Active category */
router.get('/get_active_categories', /*Auth.isSuperAdmin,*/  (req, res) => {
	try {
		categoryService.getActiveCategories(req, res);
	} catch (error) {
		logger.error(error);
		res.status(417).json(error);
	}
})

module.exports = router;