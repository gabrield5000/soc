'use strict';

const express = require('express');
const router = express.Router();

const socialController = require('../controllers/socialController');

router.get('/invites', socialController.getInvites);
router.post('/invites', socialController.postInvite);
router.get('/friends', socialController.getFriends);
router.post('/friends', socialController.postFriend);

module.exports = router;
