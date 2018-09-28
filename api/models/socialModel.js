const mongoose = require('mongoose');

const { Schema } = mongoose;

const socialSchema = new Schema ({
	invites: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Social', socialSchema);
