import express from 'express';
import { submitManuscript } from '../controllers/manuscriptController';

const router = express.Router();

router.post('/', submitManuscript);

export default router;
