const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    console.log(req.body);
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({ massage: 'Handling Post product created to /product', createdProduct: result});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

   
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then( result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
  
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({ massage: ` your id ${id}`});
});

module.exports = router;