const router = require('express').Router();
const { verifyUser, getAllUsers } = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.patch('/verify/:id', auth, verifyUser);
router.get('/users', auth, getAllUsers);

module.exports = router;