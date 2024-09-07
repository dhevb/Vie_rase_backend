"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const manuscriptController_1 = require("../controllers/manuscriptController");
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
router.post('/api/submit-author-details', manuscriptController_1.submitAuthorDetailsController);
// Route for submitting manuscript file
router.post('/api/submit-manuscript-file', upload.single('file'), manuscriptController_1.submitManuscriptFileController);
// Route for submitting article details
router.post('/api/submit-article-details', manuscriptController_1.submitArticleDetailsController);
exports.default = router;
