'use strict';

const express = require('express');
const router = express.Router();

const { validateBody, schemas } = require('../middleware/JoiValidation');
const checkAuth = require('../middleware/checkAuth');
const paymentsController = require('../controllers/paymentsController');

router.post('/', validateBody(schemas.paymentSchema), paymentsController.add);

module.exports = router;
