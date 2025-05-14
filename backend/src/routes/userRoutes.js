const { Router } = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const {
  register,
  login,
  getProfile,
  getAllUsers
} = require('../controllers/userController');

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', authenticate, getProfile);
router.get('/', authenticate, authorize(['ADMIN']), getAllUsers);

module.exports = router;
