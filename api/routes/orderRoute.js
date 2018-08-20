'use strict';

const express = require("express");
const router = express.Router();

const { validateBody, schemas } = require('../middleware/JoiValidation');
const checkAuth = require('../middleware/checkAuth');
const ordersController = require('../controllers/orderController');

router.get("/", ordersController.list);

router.post("/", validateBody(schemas.orderSchema), ordersController.add);

router.get("/:id", ordersController.get);

// router.put("/:id", ordersController.update);

router.delete("/:id", ordersController.delete);

module.exports = router;