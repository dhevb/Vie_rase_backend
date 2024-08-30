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
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Import your routes here
app.use('/reset-password', authController_3.updatePassword);
app.use('/submit-manuscript-file', manuscriptController_1.submitManuscriptFile);
app.use('/submit-article-details', manuscriptController_2.submitArticleDetails);
app.use('/login', authController_1.login);
app.use('/signup', authController_2.signup);
app.use('/reset-password', authController_3.updatePassword);
(0, db_1.connectToDatabase)(); // Verify database connection
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
