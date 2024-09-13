"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const manuscript_vbe_Controller_1 = require("../controllers/manuscript_vbe_Controller");
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
router.post('/api/vbe_submit-author-details', manuscript_vbe_Controller_1.vbe_submitAuthorDetailsController);
// Route for submitting manuscript file
router.post('/api/vbe_submit-manuscript-file', upload.single('file'), manuscript_vbe_Controller_1.vbe_submitManuscriptFileController);
// Route for submitting article details
router.post('/api/vbe_submit-article-details', manuscript_vbe_Controller_1.vbe_submitArticleDetailsController);
// Route for getting manuscript details
router.get('/api/vbe_manuscripts/user/:userId', manuscript_vbe_Controller_1.vbe_getManuscriptsByUserController);
exports.default = router;
