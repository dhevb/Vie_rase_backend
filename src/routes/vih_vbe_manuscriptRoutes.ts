import express from 'express';
import multer from 'multer';
import { vih_submitAuthorDetailsController,  vih_getManuscriptsByUserController, vih_submitManuscriptFileController,  vih_submitArticleDetailsController } from '../controllers/manuscript_vih_Controller';

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


router.post('/api/ vih_submit-author-details',  vih_submitAuthorDetailsController);

// Route for submitting manuscript file
router.post('/api/ vih_submit-manuscript-file', upload.single('file'),  vih_submitManuscriptFileController);

// Route for submitting article details
router.post('/api/ vih_submit-article-details',  vih_submitArticleDetailsController);
// Route for getting manuscript details
router.get('/api/ vih_manuscripts/user/:userId',  vih_getManuscriptsByUserController);
export default router;

