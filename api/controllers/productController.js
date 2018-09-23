'use strict';

const productRepository = require('./../repositories/productRepository');

exports.list = async (req, res) => {  
	try {
		const productsStore = await productRepository.find();
		res.status(200).json(productsStore);
	} catch (error) {
		throw error;
	}
};

exports.add = async (req, res) => {
	try {
		const product = await productRepository.add({...req.body});
		if(product) {
			res.status(201).json({ massage: 'Created product successfully' });
		}
	} catch (error) {
		throw error;
	}
};

exports.get = async(req, res) => {
	try {
		const id = req.params.id;
		const product = await productRepository.findById(id);     
		if(!product) {
			return res.status(404).json({ massage: 'No valid entry found for provided ID' });
		}
		res.status(200).json(product);
	} catch (error) {
		throw error;
	}
};

exports.update = async (req, res) => {
	try {
		await productRepository.update(req.params.id,req.body);
		res.status(200).json({ massage: 'product updated' });
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.delete = async (req, res) => {
	try {
		const result = await productRepository.statusChange(req.params.id); 
		if(!result) {
			res.status(200).json({ message: 'Product deleted' });
		}       
	} catch (error) {
		throw error;
	}
};