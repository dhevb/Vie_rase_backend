import express from 'express';
import multer from 'multer';
import { vbe_submitAuthorDetailsController, vbe_getManuscriptsByUserController, vbe_submitManuscriptFileController, vbe_submitArticleDetailsController } from '../controllers/manuscript_vbe_Controller';

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


router.post('/api/vbe_submit-author-details', vbe_submitAuthorDetailsController);

// Route for submitting manuscript file
router.post('/api/vbe_submit-manuscript-file', upload.single('file'), vbe_submitManuscriptFileController);

// Route for submitting article details
router.post('/api/vbe_submit-article-details', vbe_submitArticleDetailsController);
// Route for getting manuscript details
router.get('/api/vbe_manuscripts/user/:userId', vbe_getManuscriptsByUserController);
export default router;

