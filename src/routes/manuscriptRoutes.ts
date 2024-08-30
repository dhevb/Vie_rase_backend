import express from 'express';
import upload from '../utils/upload'; // Import multer configuration
import { submitManuscriptFile, submitArticleDetails } from '../controllers/manuscriptController';

const router = express.Router();

// Route for manuscript file submission
router.post('/submit-manuscript-file', upload.single('file'), submitManuscriptFile);

// Route for article details submission
router.post('/submit-article-details', submitArticleDetails);

export default router;
