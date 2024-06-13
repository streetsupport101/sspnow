const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String },
    bio: { type: String },
    qrCode: { type: String },
    verified: { type: Boolean, default: false },
    donations: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);