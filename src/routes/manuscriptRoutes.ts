import express from 'express';
import { submitManuscript } from '../controllers/manuscriptController';

const router = express.Router();

router.post('/submit_manuscript', submitManuscript);

export default router;
