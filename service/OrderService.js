var logger = require('../config/Logger');
import OrderSchema from '../models/OrderSchema';
import ProductSchema from '../models/ProductSchema';
import CategorySchema from '../models/CategorySchema';
import CustomError from '../error/CustomError';
import UploadImage from '../utils/Upload_File';
import ResponseDto from '../utils/ResponseDto';


module.exports = {
    saveOrder: async function (req, res) {
        try {
            var order = req.body;
            var products = new Array();
            for (let product of order.products) {
                products.push(product.name);
            }
            const dbProducts = await ProductSchema.find({ name: { $in: products } });
            if (!dbProducts && products.length != dbProducts.length) {
                throw new CustomError('PRO001');
            }
            await OrderSchema.create(order)
                .then(function (data) {
                    res.status(200).json(new ResponseDto('Order created succesfully'));
                })
                .catch(function (err) {
                    return res.status(417).json({ success: false, message: err.message })
                });
        } catch (err) {
            logger.error(err);
            if (err instanceof ReferenceError) {
                var error = {
                    success: false,
                    error: err.message
                }
                return res.status(417).json(error);
            }
            res.status(417).json(err);
        }
    },

    updateOrder: async function (req, res) {
        try {
            var order = req.body;
            const orderId = req.headers['id'];
            const dbOrder = await OrderSchema.findOne({ _id: orderId });
            if (!dbOrder) {
                throw new CustomError('ORD002');
            }
            for (let product of order.products) {
                products.push(product.name);
            }
            const dbProducts = await ProductSchema.find({ name: { $in: products } });
            if (!dbProducts && products.length != dbProducts.length) {
                throw new CustomError('PRO001');
            }
            dbOrder.products = order.products;
            dbOrder.price = order.price;
            dbOrder.quantity = order.quantity;
            dbOrder.description = order.description;
            dbOrder.address = order.address;
            dbOrder.save(function (err, date) {
                if (err) {
                    throw new CustomError('PRO005');
                }
                res.status(200).json({ message: 'Order Updated successfully' })
            });
        } catch (err) {
            logger.warn(err);
            res.status(417).json(err);
        }
    },

    getOrders: async function (req, res) {
        try {
            const orders = await OrderSchema.find();
            logger.info(orders);
            res.status(200).json(orders);
        } catch (err) {
            logger.error(err);
            res.status(417).json(err);
        }
    },

    updateProductStatus: async function (req, res) {
        try {
            var order = req.body;
            if (!order.status) {
                throw new CustomError("STAT001");
            }
            const orderId = req.headers['id'];
            const dbOrder = await OrderSchema.findOne({ _id: orderId });
            if (!dbOrder) {
                throw new CustomError('ORD002');
            }
            dbOrder.status = order.status;
            dbOrder.save(function (err, date) {
                if (err) {
                    throw new CustomError('PRO005');
                }
                res.status(200).json({ message: 'Order Status Updated successfully' })
            });
        } catch (err) {
            logger.error(err);
            res.status(417).json(err);
        }
    }
} 