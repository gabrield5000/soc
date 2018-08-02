'use strict'

const express = require("express");
const router = express.Router();

const { validateBody, schemas } = require('../middleware/checkValider');
const userController = require('../controllers/user');
const checkAuth = require('../middleware/checkAuth');


router.post('/signup', validateBody(schemas.authSchema), userController.signup);

router.post("/login",  validateBody(schemas.authSchema), userController.login);

router.get("/auth", userController.auth);

router.delete('/:id', checkAuth, userController.delete)

module.exports = router;