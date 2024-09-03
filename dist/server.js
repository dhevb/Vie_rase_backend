"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config"); // Ensure dotenv is configured at the top of your entry file
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./utils/db"); // Adjust the path as needed
const authController_1 = require("./controllers/authController");
const authController_2 = require("./controllers/authController");
const authController_3 = require("./controllers/authController");
const manuscriptController_1 = require("./controllers/manuscriptController");
const manuscriptController_2 = require("./controllers/manuscriptController");
const manuscriptController_3 = require("./controllers/manuscriptController");
const authController_4 = require("./controllers/authController");
const authController_5 = require("./controllers/authController");
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const upload = (0, multer_1.default)({ dest: 'uploads/' });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Import your routes here
app.use('/api/reset-password', authController_3.updatePassword);
app.use('/api/submit-manuscript-file', upload.single('file'), manuscriptController_3.submitManuscriptFileController);
app.use('/api/submit-article-details', manuscriptController_1.submitArticleDetailsController);
app.use('/api/submit-author-details', manuscriptController_2.submitAuthorDetailsController);
app.use('/api/login', authController_1.login);
app.use('/api/signup', authController_2.signup);
app.use('/api/logout', authController_4.logout);
app.use('/api/checkAuth', authController_5.checkAuth);
app.use('/api/reset-password', authController_3.updatePassword);
(0, db_1.connectToDatabase)(); // Verify database connection
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
