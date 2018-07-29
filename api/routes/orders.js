const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ordersController = require('../controllers/orders');

router.get("/", checkAuth, ordersController.get_all);

router.post("/", checkAuth, ordersController.create_one);

router.get("/:id",  checkAuth, ordersController.get_one);

router.delete("/:id",  checkAuth, ordersController.delete_one);

module.exports = router;