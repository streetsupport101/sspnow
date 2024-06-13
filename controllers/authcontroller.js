const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateQRCode = require('../utils/qrCode');
const sendEmail = require('../utils/mailer');
const { createCharge } = require('../utils/coinbase');

const register = async (req, res) => {
    const { name, email, password, photo, bio } = req.body;

    const emailExist = await User.findOne({ email });
    if (emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        photo,
        bio,
    });

    try {
        const savedUser = await user.save();
        const qrCode = await generateQRCode(`https://streetsupport.com/profile/${savedUser._id}`);
        savedUser.qrCode = qrCode;
        await savedUser.save();

        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        res.header('Authorization', token).send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Email or password is wrong');

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header('Authorization', token).send('Logged in!');
};

const createDonationCharge = async (req, res) => {
    const { amount, currency, name, description } = req.body;
    try {
        const charge = await createCharge(amount, currency, name, description);
        res.status(200).json(charge);
    } catch (error) {
        res.status(500).send('Error creating charge');
    }
};

module.exports = { register, login, createDonationCharge };