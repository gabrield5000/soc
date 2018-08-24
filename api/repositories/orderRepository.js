'use strict';

const Order = require('./../models/orderModel');

exports.find = async () => {
    try {
        const orders = await Order.find().populate('products');
        return orders;
    } catch (error) {
        throw error;
    }
}

exports.add = async (data) => {
    try {
        const order = new Order(data);
        const addOrder = await order.save({_id:false});
        return addOrder;
    } catch (error) {
        throw error;
    }
}

exports.get = async (id) => {
    try {
        const order = await Order.findById(id).populate('products');   
       return order;
    } catch (error) {
        throw error;
    }
}

// exports.update = async (id,order) => {
//     try {
//         const updatedOrder = await Order.findOneAndUpdate({ _id: id }, { $set: { ...order }}, { new: true });
//        return updatedOrder;
//     } catch (error) {
//         throw error;
//     }
// }