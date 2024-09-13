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
const authController_4 = require("./controllers/authController");
const authController_5 = require("./controllers/authController");
// vbe manuscript
const manuscript_vbe_Controller_1 = require("./controllers/manuscript_vbe_Controller");
const manuscript_vbe_Controller_2 = require("./controllers/manuscript_vbe_Controller");
const manuscript_vbe_Controller_3 = require("./controllers/manuscript_vbe_Controller");
const manuscript_vbe_Controller_4 = require("./controllers/manuscript_vbe_Controller");
// vbh manuscript
const manuscript_vbh_Controller_1 = require("./controllers/manuscript_vbh_Controller");
const manuscript_vbh_Controller_2 = require("./controllers/manuscript_vbh_Controller");
const manuscript_vbh_Controller_3 = require("./controllers/manuscript_vbh_Controller");
const manuscript_vbh_Controller_4 = require("./controllers/manuscript_vbh_Controller");
// vbe manuscript
const manuscript_vie_Controller_1 = require("./controllers/manuscript_vie_Controller");
const manuscript_vie_Controller_2 = require("./controllers/manuscript_vie_Controller");
const manuscript_vie_Controller_3 = require("./controllers/manuscript_vie_Controller");
const manuscript_vie_Controller_4 = require("./controllers/manuscript_vie_Controller");
// vbe manuscript
const manuscript_vih_Controller_1 = require("./controllers/manuscript_vih_Controller");
const manuscript_vih_Controller_2 = require("./controllers/manuscript_vih_Controller");
const manuscript_vih_Controller_3 = require("./controllers/manuscript_vih_Controller");
const manuscript_vih_Controller_4 = require("./controllers/manuscript_vih_Controller");
// vbe
const AddArticle_vbe_Controller_1 = require("./controllers/AddArticle_vbe_Controller");
const AddArticle_vbe_Controller_2 = require("./controllers/AddArticle_vbe_Controller");
const AddArticle_vbe_Controller_3 = require("./controllers/AddArticle_vbe_Controller");
// vbh
const AddArticle_vbh_Controller_1 = require("./controllers/AddArticle_vbh_Controller");
const AddArticle_vbh_Controller_2 = require("./controllers/AddArticle_vbh_Controller");
const AddArticle_vbh_Controller_3 = require("./controllers/AddArticle_vbh_Controller");
// vie
const AddArticle_vie_Controller_1 = require("./controllers/AddArticle_vie_Controller");
const AddArticle_vie_Controller_2 = require("./controllers/AddArticle_vie_Controller");
const AddArticle_vie_Controller_3 = require("./controllers/AddArticle_vie_Controller");
// vih
const AddArticle_vih_Controller_1 = require("./controllers/AddArticle_vih_Controller");
const AddArticle_vih_Controller_2 = require("./controllers/AddArticle_vih_Controller");
const AddArticle_vih_Controller_3 = require("./controllers/AddArticle_vih_Controller");
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const upload = (0, multer_1.default)({ dest: 'uploads/' });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Import your routes here
app.use('/api/reset-password', authController_3.updatePassword);
// vbe submit manuscript routes
app.use('/api/vbe_submit-manuscript-file', upload.single('file'), manuscript_vbe_Controller_3.vbe_submitManuscriptFileController);
app.use('/api/vbe_submit-article-details', manuscript_vbe_Controller_1.vbe_submitArticleDetailsController);
app.use('/api/vbe_submit-author-details', manuscript_vbe_Controller_2.vbe_submitAuthorDetailsController);
app.use('/api/vbe_manuscripts/user/:userId', manuscript_vbe_Controller_4.vbe_getManuscriptsByUserController);
// vbe submit manuscript routes
app.use('/api/vbh_submit-manuscript-file', upload.single('file'), manuscript_vbh_Controller_3.vbh_submitManuscriptFileController);
app.use('/api/vbh_submit-article-details', manuscript_vbh_Controller_1.vbh_submitArticleDetailsController);
app.use('/api/vbh_submit-author-details', manuscript_vbh_Controller_2.vbh_submitAuthorDetailsController);
app.use('/api/vbh_manuscripts/user/:userId', manuscript_vbh_Controller_4.vbh_getManuscriptsByUserController);
// vbe submit manuscript routes
app.use('/api/vie_submit-manuscript-file', upload.single('file'), manuscript_vie_Controller_3.vie_submitManuscriptFileController);
app.use('/api/vie_submit-article-details', manuscript_vie_Controller_1.vie_submitArticleDetailsController);
app.use('/api/vie_submit-author-details', manuscript_vie_Controller_2.vie_submitAuthorDetailsController);
app.use('/api/vie_manuscripts/user/:userId', manuscript_vie_Controller_4.vie_getManuscriptsByUserController);
// vbe submit manuscript routes
app.use('/api/vih_submit-manuscript-file', upload.single('file'), manuscript_vih_Controller_3.vih_submitManuscriptFileController);
app.use('/api/vih_submit-article-details', manuscript_vih_Controller_1.vih_submitArticleDetailsController);
app.use('/api/vih_submit-author-details', manuscript_vih_Controller_2.vih_submitAuthorDetailsController);
app.use('/api/vih_manuscripts/user/:userId', manuscript_vih_Controller_4.vih_getManuscriptsByUserController);
// auth routes
app.use('/api/login', authController_1.login);
app.use('/api/signup', authController_2.signup);
app.use('/api/logout', authController_4.logout);
app.use('/api/checkAuth', authController_5.checkAuth);
app.use('/api/reset-password', authController_3.updatePassword);
// add article routes vbe
app.use('/api/vbe_add-article', AddArticle_vbe_Controller_1.vbe_saveArticleDetailsController);
app.use('/api/vbe_getallarticles', AddArticle_vbe_Controller_2.vbe_getAllArticlesController);
app.use('/api/vbe_getarticle/:id', AddArticle_vbe_Controller_3.vbe_getArticleByIdController);
// add article routes vbh
app.use('/api/vbh_add-article', AddArticle_vbh_Controller_1.vbh_saveArticleDetailsController);
app.use('/api/vbh_getallarticles', AddArticle_vbh_Controller_2.vbh_getAllArticlesController);
app.use('/api/vbh_getarticle/:id', AddArticle_vbh_Controller_3.vbh_getArticleByIdController);
// add article routes vie
app.use('/api/vie_add-article', AddArticle_vie_Controller_1.vie_saveArticleDetailsController);
app.use('/api/vie_getallarticles', AddArticle_vie_Controller_2.vie_getAllArticlesController);
app.use('/api/vie_getarticle/:id', AddArticle_vie_Controller_3.vie_getArticleByIdController);
// add article routes vih
app.use('/api/vih_add-article', AddArticle_vih_Controller_1.vih_saveArticleDetailsController);
app.use('/api/vih_getallarticles', AddArticle_vih_Controller_2.vih_getAllArticlesController);
app.use('/api/vih_getarticle/:id', AddArticle_vih_Controller_3.vih_getArticleByIdController);
(0, db_1.connectToDatabase)(); // Verify database connection
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
