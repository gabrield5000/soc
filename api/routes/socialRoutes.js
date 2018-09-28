'use strict';

const express = require('express');
const router = express.Router();

const socialController = require('../controllers/socialController');

router.get('/invites', socialController.invites);
router.get('/friends', socialController.friends);
router.get('/addInvite/:id', socialController.addInvite);
router.get('/addFriend/:id', socialController.addFriend);
router.delete('/removeInvite/:id', socialController.deleteInvite);
router.delete('/removeFriend/:id', socialController.deleteFriend);


module.exports = router;
