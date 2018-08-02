'use strict'

const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const ordersController = require('../controllers/orders');

router.get("/", checkAuth, ordersController.list);

router.post("/", checkAuth, ordersController.create);

router.get("/:id",  checkAuth, ordersController.get);

router.delete("/:id",  checkAuth, ordersController.delete);

module.exports = router;