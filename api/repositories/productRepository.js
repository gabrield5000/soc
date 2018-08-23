'use strict';
const fs = require('fs');
const Product = require('./../models/productModel');

exports.find = async () => {
    try {
        const products = await Product.find({ status : "true" });
        const response = {
            count: products.length,
            books: products.map(product => {
                return {
                    title:       product.title, 
                    series:      product.series,
                    book:        product.book,
                    author:      product.author,
                    description: product.description,
                    price:       product.price,
                    imagePath:   product.path
                }
            })
        };
        return response;
    } catch (error) {
        throw error;
    }
}

exports.add = async (...data) => {
    try {
        console.log(data);
        const base64String = data.imagePath; 
        const base64Image = base64String.split(';base64,').pop();
        const imgname = new Date().getTime().toString();
        const filePath = `uploads/${imgname}.png`;
        fs.writeFile(filePath, base64Image, {encoding: 'base64'}, function(err) {
            console.log('File created');
        });
        data.imagePath = filePath;
        const product = new Product(data);
        const addProduct = await product.save({_id:false});
        return addProduct;
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

exports.update = async (id,...data) => {
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

exports.statusChange = async (id) => {
    try {
        const product = await Product.findById(id); 
        return product;
    } catch (error) {
        throw error;
    }
}
