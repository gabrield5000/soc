'use strict';

const mongoose = require("mongoose");

const Product = require('../models/productModel');

exports.list =  (req, res, next) => {
    Product.find()
        .select( 'name price _id' )
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                request: {
                    type: 'GET'
                },
                products : docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        imageUrl: doc.imageUrl,
                        id: doc._id
                    };
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.add = (req, res, next) => {
    const product = new Product({
        title: req.body.title, 
        series: req.body.series,
        books: req.body.book,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.file.path
    });

    product
        .save()
        .then(result => {
            // console.log(result);
            res.status(201).json({ massage: 'Created product successfully', 
                                   createdProduct: {
                                        name: result.name,
                                        price: result.price,
                                        request: {
                                            type: 'POST'
                                        }
                                   }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
   
}

exports.get = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
        .select( 'name imageUrl price _id' )
        .exec()
        .then( doc => {
            console.log('get one entry from the DB', doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: "GET"
                    }
                });
            } else {
                res.status(404).json({ massage: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.update = (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then( result => {
            console.log(result);
            res.status(200).json({
                massage: 'product updated',
                request: {
                    type: 'PATCH'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
  
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