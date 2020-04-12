var logger = require('../config/Logger');
import ProductSchema from '../models/ProductSchema';
import CategorySchema from '../models/CategorySchema';
import CustomError from '../error/CustomError';
import UploadImage from '../utils/Upload_File'


module.exports = {
    saveProduct: async function (req, res) {
        try {
            var product = req.body;
            const dbProduct = await ProductSchema.findOne({ name: product.name });
            if (dbProduct) {
                throw new CustomError('PRO001');
            }
            const category = await CategorySchema.findOne({ name: product.category })
            if (!category) {
                throw new CustomError('CAT001');
            }
            await ProductSchema.create(product);
            return res.status(200).json({ success: true });
        } catch (err) {
            res.status(417).json(err);
        }
    },

    updateProduct: async function (req, res) {
        try {
            var product = req.body;
            const productId = req.headers['id'];
            const dbProduct = await ProductSchema.findOne({ _id: productId });
            if (!dbProduct) {
                throw new CustomError('PRO002');
            }
            if (dbProduct.name != product.name) {
                const duplicateProduct = await ProductSchema.findOne({ name: product.name, _id: { $ne: productId } });
                if (duplicateProduct) {
                    throw new CustomError('PRO003');
                }
                dbProduct.name = product.name;
            }
            const category = await CategorySchema.findOne({ name: product.category });
            if (!category) {
                throw new CustomError("CAT001");
            }

            var images = new Array();
            for (var image in product.images) {
                image = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
                // to declare some path to store your converted image
                const imagePath = await UploadImage.uploadImage("./public/", image);
                logger.warn(imagePath)
                if (imagePath) {
                    images.push(imagePath);
                }
                logger.warn(images);
            }
            logger.warn(images);
            dbProduct.images = images;
            dbProduct.attributes = product.attributes;
            dbProduct.price = product.price;
            dbProduct.quantity = product.quantity;
            dbProduct.description = product.description;
            dbProduct.save(function (err, date) {
                if (err) {
                    throw new CustomError('PRO005');
                }
                res.status(200).json({ message: 'updated successs' })
            });
        } catch (err) {
            logger.warn(err);
            res.status(417).json(err);
        }
    },

    getProduct: async function (req, res) {
        try {
            const products = await ProductSchema.find({ status: 'ACTIVE' });
            logger.info(products);
            res.status(200).json(products);
        } catch (err) {
            logger.error(err);
            res.status(417).json(err);
        }
    }
} 