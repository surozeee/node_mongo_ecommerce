var logger = require('../config/Logger');
import User from '../models/UserSchema';
import CustomError from '../error/CustomError';
import jwt from 'jsonwebtoken';
import jwtdecode from 'jwt-decode';

function resolved(result) {
    console.log('Resolved');
}

function rejected(result) {
    //console.error(result);
}


module.exports = {
    register: function (req, res, next) {
        var user = req.body;
        //search name like case insenstive
        //         User.find({ username: { $regex: '.*' + user.username + '.*', $options: 'i' } })
        //             .limit(5).exec().then(function (users){
        // logger.warn(users);
        //             }).catch(function (err){
        //                 logger.warn(err);
        //             });

        // const usr = findOneUserByUsername(user.username,res);
        User.findOne({ username: user.username }).exec()
            .then(function (usr) {
                if (usr) {
                    logger.debug(usr);
                    var customError = new CustomError('USR002');
                    Promise.reject(customError).then(resolved, rejected);
                    return res.status(417).json(customError);
                } else {
                    let newUser = new User();
                    newUser.firstname = user.firstname;
                    newUser.lastname = user.lastname;
                    newUser.username = user.username;
                    newUser.password = user.password;
                    newUser.role = user.role;
                    newUser.created_at = new Date();
                    newUser.updated_at = new Date();

                    logger.debug(newUser);

                    newUser.save(function (err, data) {
                        logger.error("Error: " + err)

                        if (err) {
                            return res.status(417).json({
                                success: false,
                                message: err.errmsg
                            });
                        } else {
                            return res.status(200).json({
                                success: true,
                                message: "Successfully registered",
                            })
                        }
                    });
                }
            }).catch(function (err) {
                // var customError = new CustomError('USR001');
                // Promise.reject(customError).then(resolved, rejected);
                return res.status(417).json(err);
            });
        //return res.status(417).json(customError);
    },

    login: function (req, res) {
        var responseData;
        User.findOne({ username: req.body.username }).exec()
            .then(function (usr) {
                logger.debug(usr)
                if (!usr) {
                    var customError = new CustomError('USR002');
                    Promise.reject(customError).then(resolved, rejected);
                    return res.status(417).json(customError);
                } else {
                    // usr.comparePassword(req.body.password, (err, isMatch) => {
                    //     logger.debug(err, req.body.password, isMatch, "isMatch")
                    //     if (isMatch) {
                            //logger.debug(isMatch);
                            User.findByIdAndUpdate(usr._id, { $set: { last_login: new Date() } })
                                .then(function (user) {
                                    var role = user.role[0];
                                    if(user.role.length>1){
                                        role = 'ROLE_USER';
                                    }
                                    var token = jwt.sign({
                                        id: user._id,
                                        name: user.name,
                                        username: user.username,
                                        role: user.role
                                    }, process.env.JWT_SECRET, { expiresIn: "1h" });
                                    return res.status(200).json({
                                        success: true,
                                        message: 'Login Successfully',
                                        token: token,
                                        role: role
                                    });
                                }).catch(function (err) {
                                    logger.info(err)
                                    var customError = new CustomError('USR003');
                                    Promise.reject(customError).then(resolved, rejected);
                                    return res.status(417).json(err);
                                });
                        // } else {
                        //     logger.debug('not matched');
                        //     return res.status(401).json({
                        //         success: false,
                        //         message: "Invalid Username/Password",
                        //         result: {}
                        //     })
                        // }
                    // });
                }
            }).catch(function (err) {
                var customError = new CustomError('USR001');
                Promise.reject(customError).then(resolved, rejected);
                return res.status(417).json(err);
            });
    }
} 