'use strict'

const express = require("express");
const router = express.Router();

const { validateBody, schemas } = require('../middleware/JoiValidation');
const userController = require('../controllers/user');
const checkAuth = require('../middleware/checkAuth');


router.post('/signup', validateBody(schemas.signupSchema), userController.signup);

router.post("/login", validateBody(schemas.loginSchema), userController.login);

router.get("/auth", checkAuth, userController.auth);

router.get("/logout", userController.logout);

router.delete('/:id', checkAuth, userController.delete);

module.exports = router;