'use strict';

const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const ordersController = require('../controllers/order');

router.get("/", checkAuth, ordersController.list);

router.post("/", checkAuth, ordersController.add);

router.get("/:id",  checkAuth, ordersController.get);

router.delete("/:id",  checkAuth, ordersController.delete);

module.exports = router;