import express from 'express';
import jwtdecode from 'jwt-decode';
import Auth from '../middleware/Auth';
import logger from '../config/Logger';
import ResponseDto from '../utils/ResponseDto'
const router = express.Router();

/**
 * @swagger
 * /register:
 *   put:
 *     tags:
 *       - Users
 *     name: Register User
 *     summary: Register user in system
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
 *           $ref: '#/definitions/User'
 *           type: object
 *     responses:
 *       '200':
 *         description: User info updated
 *       '403':
 *         description: No authorization / user not found
 */
const UserService = require('../service/UserService')
/* PUT User register */
router.put('/register', (req, res, next) => {
	try {
		UserService.register(req, res, next);
	} catch (error) {
		logger.error(error);
		res.status(417).json(error);
	}
});

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Logs in a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - username
 *           - password
 *     responses:
 *       '200':
 *         description: User found and logged in successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '403':
 *         description: Username and password don't match
 */
/* POST User login */
router.post('/login', (req, res) => {
	try {
		UserService.login(req, res);
	} catch (error) {
		logger.error(error);
		res.status(417).json(error);
	}
});

/* GET Current user token */
router.get('/verify', Auth.isAuthenticated, (req, res) => {
	console.log('verified');
	res.sendStatus(200);
})

/**
 * @swagger
 * /dashboard:
 *   get:
 *     tags:
 *       - Users
 *     name: Dashboard
 *     summary: User Dashboard in a user
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
/* GET Current user profile */
router.get('/dashboard', Auth.isSuperAdmin,  (req, res) => {
	logger.info(req.role);
	const token =
		req.body.token ||
		req.query.token ||
		req.headers['x-access-token'] ||
		req.cookies.token;
	logger.debug('token'+token)
	if (token) {
		let data = jwtdecode(token);
		let response = new ResponseDto("Successfully", data)
		res.status(200).json(response);
	} else {
		res.status(401).json({
			success: false,
			message: "You are not logged in",
			result: null
		})
	}
})

module.exports = router;