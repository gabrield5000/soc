const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ massage: 'Handling GET requests to /product'});
});

router.post('/', (req, res, next) => {
    res.status(201).json({ massage: 'Handling Post product created to /product'});
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({ massage: ` your id ${id}`});
});

module.exports = router;