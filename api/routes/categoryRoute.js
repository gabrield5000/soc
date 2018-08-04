'use strict';

const express = require("express");
const router = express.Router();


const { validateBody, schemas } = require('../middleware/JoiValidation');
const checkAuth = require('../middleware/checkAuth');

const categoryController = require('../controllers/categoryController');

router.get("/", categoryController.list);

router.post("/", validateBody(schemas.categorySchema), categoryController.add);

// router.get("/:id", categoryController.get);

// router.delete("/:id", categoryController.delete);

module.exports = router;