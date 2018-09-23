'use strict';

const orderRepository = require('../repositories/orderRepository');

exports.list = async (req, res, next) => {  
	try {
		const ordersStore = await orderRepository.find();
		if(!ordersStore) {
			res.status(200).json({ massage: 'no orders found' });
		}
		res.status(200).json(ordersStore);
	} catch (error) {
		throw error;
	}
};

exports.add = async (req, res, next) => {
	try {
		const orderStore = await orderRepository.add(req.body);
		if(!orderStore) {
			return res.status(404).json({ message: 'order not finish' });
		}
		const newOrderStore = { hash: orderStore.hash , status: orderStore.status };
		res.status(201).json(newOrderStore);
	} catch (error) {
		throw error;
	}
};

exports.get = async(req, res, next) => {
	try {
		const id = req.params.id;
		const order = await orderRepository.get(id);     
		if(!order) {
			return res.status(404).json({ massage: 'Order not found' });
		}
		res.status(200).json(order);
	} catch (error) {
		throw error;
	}
};

// exports.put = async(req, res, next) => {
//   try {
//     const id = req.params.id;
//     const order = await orderRepository.update(id,...req.body);     
//     if(order) {
//       return res.status(404).json({ massage: "Order has been updateed" });
//     }
//   } catch (error) {
//     throw error;
//   }
// }

// exports.delete = (req, res, next) => {
//     Order.remove({ _id: req.params.orderId })
//       .exec()
//       .then(result => {
//         res.status(200).json({
//           message: "Order deleted",
//           request: {
//             type: "POST",
//             body: { productId: "ID", quantity: "Number" }
//           }
//         });
//       })
//       .catch(err => {
//         res.status(500).json({
//           error: err
//         });
//       });
// }