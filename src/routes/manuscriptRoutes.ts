import express from 'express';
import multer from 'multer';
import { submitAuthorDetailsController, submitManuscriptFileController, submitArticleDetailsController } from '../controllers/manuscriptController';

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
  fileFilter(req, file, cb) {
    if (file.mimetype !== 'application/msword' && file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return cb(new Error('Only .doc and .docx files are allowed'));
    }
    cb(null, true);
  }
});

const router = express.Router();

// Route for submitting author details
router.post('/api/submit-author-details', submitAuthorDetailsController);

// Route for submitting manuscript file
router.post('/api/submit-manuscript-file', upload.single('file'), submitManuscriptFileController);

// Route for submitting article details
router.post('/api/submit-article-details', submitArticleDetailsController);

export default router;
