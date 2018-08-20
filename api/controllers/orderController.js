'use strict';

const orderRepository = require('../repositories/orderRepository');
const productRepository = require('../repositories/productRepository');
const mongoose = require("mongoose");

const Order = require("../models/orderModel");
const Product = require("../models/productModel");

exports.list = async (req, res, next) => {  
  try {
      const ordersStore = await orderRepository.find();
      if(!ordersStore) {
        res.status(200).json({ massage: "no orders found" });
      }
      res.status(200).json(ordersStore);
  } catch (error) {
      throw error;
  }
}

exports.add = async (req, res, next) => {
  try {
    const orderStore = await orderRepository.add(req.body);
    if(!orderStore) {
      return res.status(404).json({ message: "order not finish" });
    }
    res.status(201).json({ message: "order finish" });
  } catch (error) {
    throw error;
  }
}

exports.get = async(req, res, next) => {
  try {
      const id = req.params.id;
      const order = await orderRepository.get(id);     
      if(!order) {
          return res.status(404).json({ massage: "Order not found" });
      }
      res.status(200).json(order);
  } catch (error) {
      throw error;
  }
}

exports.delete = (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Order deleted",
          request: {
            type: "POST",
            body: { productId: "ID", quantity: "Number" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
}