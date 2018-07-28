const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload/');
    },
    filename: function (req, file, cb) {
        cb(null, new Data().toISOString + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb (null, true);
    } else {
        cb (null, false);
    }
}

const upload = multer({ 
    storage: storage, 
    limits: {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
        .select( 'name price _id' )
        .exec()
        .then(docs => {
            // console.log(docs);
            const response = {
                count: docs.length,
                request: {
                    type: 'GET'
                },
                // products: docs
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
});

router.post('/', upload.single('Image'), (req, res, next) => {
    console.log(req.body);
    const product = new Product({
        name: req.body.name,
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
   
});

router.get('/:id', (req, res, next) => {
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
  
});

router.delete("/:id", (req, res, next) => {
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
  });

module.exports = router;