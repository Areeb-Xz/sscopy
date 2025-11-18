const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const {
  registerUser,
  loginUser,
  getUserInfo,
  updateMe
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserInfo);
router.put('/me', protect, updateMe);

module.exports = router;
