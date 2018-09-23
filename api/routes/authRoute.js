'use strict';

const express = require('express');

const router = express.Router();

const { validateBody, schemas } = require('../middleware/JoiValidation');
const authController = require('../controllers/authController');
const checkAuth = require('../middleware/checkAuth');


router.post('/signup', validateBody(schemas.signupSchema), authController.signup);

router.post('/login', validateBody(schemas.loginSchema), authController.login);

router.get('/user', checkAuth, authController.auth);

// router.get('/logout', checkAuth, authController.logout);

router.delete('/:id', checkAuth, authController.delete);

module.exports = router;
