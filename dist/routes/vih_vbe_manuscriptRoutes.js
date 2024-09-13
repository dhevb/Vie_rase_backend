"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const manuscript_vih_Controller_1 = require("../controllers/manuscript_vih_Controller");
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
router.post('/api/ vih_submit-author-details', manuscript_vih_Controller_1.vih_submitAuthorDetailsController);
// Route for submitting manuscript file
router.post('/api/ vih_submit-manuscript-file', upload.single('file'), manuscript_vih_Controller_1.vih_submitManuscriptFileController);
// Route for submitting article details
router.post('/api/ vih_submit-article-details', manuscript_vih_Controller_1.vih_submitArticleDetailsController);
// Route for getting manuscript details
router.get('/api/ vih_manuscripts/user/:userId', manuscript_vih_Controller_1.vih_getManuscriptsByUserController);
exports.default = router;
