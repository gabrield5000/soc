'use strict';

const Product = require('./../models/productModel');

exports.find = async () => {
    try {
        const products = await Product.find();
        const response = {
            count: products.length,
            books: products.map(doc => {
                return {
                    title:       req.body.title, 
                    series:      req.body.series,
                    book:        req.body.book,
                    author:      req.body.author,
                    description: req.body.description,
                    price:       req.body.price,
                    imagePath:   req.file.path
                }
            })
        };
        return response;
    } catch (error) {
        throw error;
    }
}


exports.add = async () => {
    try {
        const product = new Product(data);
        const addProduct = await product.save({_id:false});
        return addProduct;
    } catch (error) {
        throw error;
    }
}

exports.filter = async () => {
    try {
      
    } catch (error) {
        throw error;
    }
}

exports.findById = async (id) => {
    try {
        const product = await Product.findById(id);     
       return product;
    } catch (error) {
        throw error;
    }
}

exports.update = async (id,data) => {
    try {
        const updateOps = {};
        for (const ops of data) {
            updateOps[ops.propName] = ops.value;
        }
        const result = await Product.update({ _id: id }, { $set: updateOps });
        return result;
    } catch (error) {
        throw error;        
    }
}

exports.userDactive = async (id) => {
    try {
        const result = await Product.update({ _id: id }, { $set: updateOps });
        return result;
    } catch (error) {
        throw error;
    }
}
