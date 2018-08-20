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

exports.add = async (...data) => {
    try {
        const order = new Order(...data);
        const addOrder = await order.save({_id:false});
        return addOrder;
    } catch (error) {
        throw error;
    }
}

exports.get = async (id) => {
    try {
        const order = await Order.findById(id).populate('products');   
        console.log(order);  
       return order;
    } catch (error) {
        throw error;
    }
}