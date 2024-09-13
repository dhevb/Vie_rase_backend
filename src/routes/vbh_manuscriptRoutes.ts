import express from 'express';
import multer from 'multer';
import { vbh_submitAuthorDetailsController, vbh_getManuscriptsByUserController, vbh_submitManuscriptFileController, vbh_submitArticleDetailsController } from '../controllers/manuscript_vbh_Controller';

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


router.post('/api/vbh_submit-author-details', vbh_submitAuthorDetailsController);

// Route for submitting manuscript file
router.post('/api/vbh_submit-manuscript-file', upload.single('file'), vbh_submitManuscriptFileController);

// Route for submitting article details
router.post('/api/vbh_submit-article-details', vbh_submitArticleDetailsController);
// Route for getting manuscript details
router.get('/api/vbh_manuscripts/user/:userId', vbh_getManuscriptsByUserController);
export default router;

