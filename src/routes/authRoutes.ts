import express from 'express';
import { signup,login, updatePassword } from '../controllers/authController';

const router = express.Router();


router.post('/login', login);
router.post('/signup', signup);
router.post('/reset-password', updatePassword);

export default router;
