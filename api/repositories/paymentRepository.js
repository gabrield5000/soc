'use strict';

const Payment = require('./../models/paymentModel');
const Order = require('./../models/orderModel');
const status = 'order is finish';

exports.add = async (data) => {
    try {
        const order = await Order.findById(data.orderId);
        if(data.hash === order.hash){
            const payment = new Payment(data);
            const savedPayment = await payment.save({_id:false});
            const updatedOrder = await Order.findOneAndUpdate({ _id: data.orderId }, { $set: { closeAt: new Date(), status: status, payment: savedPayment._id  }}, { new: true });
            return updatedOrder;
        }
    } catch (error) {
        throw error;
    }
}