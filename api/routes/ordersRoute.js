'use strict';

const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const ordersController = require('../controllers/orderController');

router.get("/", ordersController.list);

router.post("/", ordersController.add);

router.get("/:id", ordersController.get);

router.delete("/:id", ordersController.delete);

module.exports = router;