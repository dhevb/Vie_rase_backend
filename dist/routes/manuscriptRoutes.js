"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("../utils/upload")); // Import multer configuration
const manuscriptController_1 = require("../controllers/manuscriptController");
const router = express_1.default.Router();
// Route for manuscript file submission
router.post('/submit-manuscript-file', upload_1.default.single('file'), manuscriptController_1.submitManuscriptFile);
// Route for article details submission
router.post('/submit-article-details', manuscriptController_1.submitArticleDetails);
exports.default = router;
