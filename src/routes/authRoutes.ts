import express from 'express';
import { signup,login, updatePassword } from '../controllers/authController';
import { checkAuth } from '../controllers/authController';
import { blacklistToken  } from '../utils/tokenUtils';
const router = express.Router();


router.post('/api/login', login);
router.post('/api/signup', signup);
router.post('/api/reset-password', updatePassword);
router.get('/api/check-auth', blacklistToken , checkAuth);
export default router;
