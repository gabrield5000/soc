'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    inviteFriends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});

module.exports = mongoose.model('Profile', profileSchema);