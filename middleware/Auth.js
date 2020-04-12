const jwt = require('jsonwebtoken');
import logger from '../config/Logger';
import CustomError from '../error/CustomError';
import User from '../models/UserSchema';


module.exports = {
    isSuperAdmin: function (req, res, next) {
        try {
            module.exports.isAuthenticated(req, res);
            var role = req.role;
            logger.info(role instanceof Array)
            if (!role.includes('ROLE_ADMIN')) {
                throw new CustomError("AUTH001");
            } 
            next();
        } catch (err) {
            res.status(417).json(err);
        }
    },
    isAdmin: function (req, res, next) {
        module.exports.isAuthenticated(req, res);
        logger.warn(req.role)
        //logger.warn(checkAuthentication(token));
        next()
    },
    isAuthenticated: function (req, res) {
        try {
            const token =
                req.body.token ||
                req.query.token ||
                req.headers['x-access-token'] ||
                req.cookies.token;
            logger.info(token);
            if (!token) {
                throw new CustomError("TOK001");
                //res.status(401).send('Unauthorized: No token provided');
            } else {
                jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                    if (err) {
                        console.log(err, "error")
                        throw new CustomError("TOK002");
                        //res.status(401).send('Unauthorized: Invalid token');
                    } else {
                        req.name = decoded.name;
                        req.username = decoded.username;
                        req.role = decoded.role;
                    }
                });
            }
        } catch (err) {
            res.status(417).json(err);
        }
    },
    getUserData: function (req, res, next) {
        const token =
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;
        if (!token) {
            res.status(401).send('Unauthorized: No token provided');
        } else {
            jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                req.name = decoded.name;
                req.username = decoded.username;
                next();
            });
        }
    }
};
