'use strict';

const paymentRepository = require('./../repositories/paymentRepository');

const paymentProviders = [
    {id:1, name: "visa", code: 1111},
    {id:2, name: "master-card", code: 2222},
    {id:3, name: "american express", code: 3333}
];

exports.list = async (req, res, next) => {  
    try {
        res.status(200).json(paymentProviders);
    } catch (error) {
        throw error;
    }
}

exports.add = async (req, res, next) => {
    try {
        const paymentStore = await paymentRepository.add(req.body);
        if(!paymentStore) {
          return res.status(404).json({ message: "thre was a problem with order" });
        }
        res.status(201).json({ message: "order finish" });
      } catch (error) {
        throw error;
      }
}
