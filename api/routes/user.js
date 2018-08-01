const express = require("express");
const router = express.Router();

const { validateBody, schemas} = require('../middleware/checkValider');
const userController = require('../controllers/user');
const checkAuth = require('../middleware/checkAuth');


router.post('/signup', validateBody(schemas.authSchema), userController.user_signup);

router.post("/login",  validateBody(schemas.authSchema), userController.user_login);

router.delete('/:userId', checkAuth, userController.user_delete)

module.exports = router;