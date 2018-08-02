const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const customersController = require('../controllers/orders');

router.get("/", checkAuth, customersController.list);

// router.post("/", checkAuth, customersController.create_one);

router.get("/:id",  checkAuth, customersController.display);

router.delete("/:id",  checkAuth, customersController.delete);

module.exports = router;