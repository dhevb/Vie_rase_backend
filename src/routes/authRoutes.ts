import express from 'express';
import { updatePassword } from '../controllers/authController';

const router = express.Router();

router.post('/reset-password', updatePassword);

export default router;
