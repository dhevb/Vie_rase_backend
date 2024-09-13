"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const manuscript_vie_Controller_1 = require("../controllers/manuscript_vie_Controller");
// Setup multer for file uploads
const upload = (0, multer_1.default)({
    dest: 'uploads/',
    limits: { fileSize: 100 * 1024 * 1024 }, // 10 MB
    fileFilter(req, file, cb) {
        if (file.mimetype !== 'application/msword' && file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return cb(new Error('Only .doc and .docx files are allowed'));
        }
        cb(null, true);
    }
});
const router = express_1.default.Router();
router.post('/api/vie_submit-author-details', manuscript_vie_Controller_1.vie_submitAuthorDetailsController);
// Route for submitting manuscript file
router.post('/api/vie_submit-manuscript-file', upload.single('file'), manuscript_vie_Controller_1.vie_submitManuscriptFileController);
// Route for submitting article details
router.post('/api/vie_submit-article-details', manuscript_vie_Controller_1.vie_submitArticleDetailsController);
// Route for getting manuscript details
router.get('/api/vie_manuscripts/user/:userId', manuscript_vie_Controller_1.vie_getManuscriptsByUserController);
exports.default = router;
