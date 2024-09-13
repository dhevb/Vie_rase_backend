import express from 'express';
import multer from 'multer';
import { vie_submitAuthorDetailsController, vie_getManuscriptsByUserController, vie_submitManuscriptFileController, vie_submitArticleDetailsController } from '../controllers/manuscript_vie_Controller';

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


router.post('/api/vie_submit-author-details', vie_submitAuthorDetailsController);

// Route for submitting manuscript file
router.post('/api/vie_submit-manuscript-file', upload.single('file'), vie_submitManuscriptFileController);

// Route for submitting article details
router.post('/api/vie_submit-article-details', vie_submitArticleDetailsController);
// Route for getting manuscript details
router.get('/api/vie_manuscripts/user/:userId', vie_getManuscriptsByUserController);
export default router;

