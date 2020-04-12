var logger = require('../config/Logger');
import CategorySchema from '../models/CategorySchema';
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
    saveCategory: async function (req, res, next) {
        var category = req.body;
        logger.warn(category);
        try {
            const dbCategory = await CategorySchema.findOne({ name: category.name });
            if (dbCategory) {
                throw new CustomError("CAT004");
            }
            if (category.parent) {
                const parentCategory = await CategorySchema.findOne({ name: category.parent });
                if (!parentCategory) {
                    throw new CustomError('CAT002');
                }
                logger.debug(parentCategory)
            }
            await CategorySchema.create(req.body);
            return res.status(200).json({ success: true });
        } catch (err) {
            logger.debug(err);
            if (err.errors) {
                let error = {
                    success: false,
                    message: err.errors.name.message
                }
                return res.status(417).json(error)
            }
            return res.status(417).json(err)
        }
    },

    updateCategory: async function (req, res) {
        try {
            var category = req.body;
            const categoryId = req.headers['id'];
            const dbCategory = await CategorySchema.findOne({ _id: categoryId });
            if (!dbCategory) {
                throw new CustomError('CAT002');
            }
            if (dbCategory.name != category.name) {
                const duplicateCategory = await CategorySchema.findOne({ name: category.name, _id: { $ne: categoryId } });
                if (duplicateCategory)
                    throw new CustomError('CAT003');
            }

            if (category.parent) {
                const parentCategory = await CategorySchema.findOne({ name: category.parent });
                if (!parentCategory) {
                    throw new CustomError('CAT004');
                }
                dbCategory.parent = parentCategory.name;
            }
            dbCategory.name = category.name;
            dbCategory.status = category.status ? category.status : dbCategory.status
            dbCategory.save(function (err, data) {
                if (err) {
                    throw new CustomError('CAT005');
                }
                res.status(200).json({ message: 'saved successs' })
            });
        } catch (err) {
            res.status(417).json(err);
        }
    },

    getActiveCategories: function (req, res, next) {
        CategorySchema.find({ status: 'ACTIVE' }, 'name status parent').exec()
            .then(function (categories) {
                return res.status(417).json(categories);
            }).catch(function (err) {
                var customError = new CustomError('CAT004');
                Promise.reject(customError).then(resolved, rejected);
                return res.status(417).json(err);
            });
    }
} 