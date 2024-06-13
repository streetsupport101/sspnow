const User = require('../models/user');

const verifyUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');

        user.verified = true;
        await user.save();
        res.send('User verified');
    } catch (error) {
        res.status(400).send(error);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = { verifyUser, getAllUsers };