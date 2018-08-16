'use strict';

const mongoose = require("mongoose");

// const Product = require('../models/productModel');
const productRepository = require('./../repositories/productRepository');


exports.list = async (req, res, next) => {  
    try {
        const productsStore = await productRepository.find();
        res.status(200).json(productsStore);
    } catch (error) {
        throw error
        // res.status(500).json({ error: error });
    }
}

exports.add = async (req, res, next) => {
    try {
        const product = await productRepository.add(req.body);
        if(product) {
            res.status(201).json({ massage: 'Created product successfully' });
        }
    } catch (error) {
        throw error;
    }
}

exports.get = async(req, res, next) => {
    try {
        const id = req.params.id;
        const product = await productRepository.findById(id);     
        if(!product) {
            return res.status(404).json({ massage: "No valid entry found for provided ID" });
        }
        res.status(200).json(product);
    } catch (error) {
        throw error;
    }
}

exports.update = async (req, res, next) => {
    try {
        const result = await productRepository.update(req.params.id,req.body);
        res.status(200).json({ massage: 'product updated' });
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.delete = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                body: { name: 'String', price: 'Number' }
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }