'use strict';

const mongoose = require("mongoose");

const Product = require('../models/productModel');

exports.list = async (req, res, next) => {  
    try {
        const docs = await Product.find();
        const response = {
            count: docs.length,
            books: docs.map(doc => {
                return {
                    title:       req.body.title, 
                    series:      req.body.series,
                    book:        req.body.book,
                    author:      req.body.author,
                    description: req.body.description,
                    price:       req.body.price,
                    imagePath:   req.file.path
                }
            }); 
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.add = (req, res, next) => {
    try {
        const product = new Product({
            title:       req.body.title, 
            series:      req.body.series,
            book:        req.body.book,
            author:      req.body.author,
            description: req.body.description,
            price:       req.body.price,
            imagePath:   req.file.path
        });
    
        const doc = await product.save();
        res.status(201).json({ massage: 'Created product successfully' });

    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.get = async(req, res, next) => {
    try {
        const id = req.params.id;
        const doc = await Product.findById(id);     
        if(!doc) {
            return res.status(404).json({ massage: "No valid entry found for provided ID" });
        }
        res.status(200).json({ book: doc });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.update = (req, res, next) => {
    try {
        const id = req.params.id;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        const result = await Product.update({ _id: id }, { $set: updateOps });
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