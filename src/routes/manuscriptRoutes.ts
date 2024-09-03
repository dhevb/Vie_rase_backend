import express from 'express';
import multer from 'multer';
import { submitAuthorDetailsController, submitManuscriptFileController, submitArticleDetailsController } from '../controllers/manuscriptController';

// Setup multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 100 * 1024 * 1024 }, // 10 MB
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
