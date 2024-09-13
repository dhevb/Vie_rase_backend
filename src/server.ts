import express from 'express';
import 'dotenv/config'; // Ensure dotenv is configured at the top of your entry file
import cors from 'cors';
import { connectToDatabase } from './utils/db'; // Adjust the path as needed
import {login} from './controllers/authController';
import {signup} from './controllers/authController';
import { updatePassword } from './controllers/authController';
import {logout} from './controllers/authController';
import {checkAuth} from './controllers/authController';
// vbe manuscript
import { vbe_submitArticleDetailsController } from './controllers/manuscript_vbe_Controller';
import {vbe_submitAuthorDetailsController } from './controllers/manuscript_vbe_Controller';
import { vbe_submitManuscriptFileController } from './controllers/manuscript_vbe_Controller';
import { vbe_getManuscriptsByUserController } from './controllers/manuscript_vbe_Controller';
// vbh manuscript
import { vbh_submitArticleDetailsController } from './controllers/manuscript_vbh_Controller';
import {vbh_submitAuthorDetailsController } from './controllers/manuscript_vbh_Controller';
import { vbh_submitManuscriptFileController } from './controllers/manuscript_vbh_Controller';
import { vbh_getManuscriptsByUserController } from './controllers/manuscript_vbh_Controller';

// vbe manuscript
import { vie_submitArticleDetailsController } from './controllers/manuscript_vie_Controller';
import {vie_submitAuthorDetailsController } from './controllers/manuscript_vie_Controller';
import { vie_submitManuscriptFileController } from './controllers/manuscript_vie_Controller';
import { vie_getManuscriptsByUserController } from './controllers/manuscript_vie_Controller';
// vbe manuscript
import { vih_submitArticleDetailsController } from './controllers/manuscript_vih_Controller';
import {vih_submitAuthorDetailsController } from './controllers/manuscript_vih_Controller';
import { vih_submitManuscriptFileController } from './controllers/manuscript_vih_Controller';
import { vih_getManuscriptsByUserController } from './controllers/manuscript_vih_Controller';

// vbe
import {vbe_saveArticleDetailsController} from './controllers/AddArticle_vbe_Controller';
import {vbe_getAllArticlesController} from './controllers/AddArticle_vbe_Controller'
import {vbe_getArticleByIdController} from './controllers/AddArticle_vbe_Controller';
// vbh
import {vbh_saveArticleDetailsController} from './controllers/AddArticle_vbh_Controller';
import {vbh_getAllArticlesController} from './controllers/AddArticle_vbh_Controller'
import {vbh_getArticleByIdController} from './controllers/AddArticle_vbh_Controller';
// vie
import {vie_saveArticleDetailsController} from './controllers/AddArticle_vie_Controller';
import {vie_getAllArticlesController} from './controllers/AddArticle_vie_Controller'
import {vie_getArticleByIdController} from './controllers/AddArticle_vie_Controller';
// vih
import {vih_saveArticleDetailsController} from './controllers/AddArticle_vih_Controller';
import {vih_getAllArticlesController} from './controllers/AddArticle_vih_Controller'
import {vih_getArticleByIdController} from './controllers/AddArticle_vih_Controller';



import multer from 'multer';
const app = express();
const port = process.env.PORT || 3000;
const upload = multer({ dest: 'uploads/' });
app.use(cors());
app.use(express.json());

// Import your routes here
app.use('/api/reset-password', updatePassword);
// vbe submit manuscript routes
app.use('/api/vbe_submit-manuscript-file',  upload.single('file'), vbe_submitManuscriptFileController);
app.use('/api/vbe_submit-article-details', vbe_submitArticleDetailsController);
app.use('/api/vbe_submit-author-details', vbe_submitAuthorDetailsController);
app.use('/api/vbe_manuscripts/user/:userId', vbe_getManuscriptsByUserController)
// vbe submit manuscript routes
app.use('/api/vbh_submit-manuscript-file',  upload.single('file'), vbh_submitManuscriptFileController);
app.use('/api/vbh_submit-article-details', vbh_submitArticleDetailsController);
app.use('/api/vbh_submit-author-details', vbh_submitAuthorDetailsController);
app.use('/api/vbh_manuscripts/user/:userId', vbh_getManuscriptsByUserController)
// vbe submit manuscript routes
app.use('/api/vie_submit-manuscript-file',  upload.single('file'), vie_submitManuscriptFileController);
app.use('/api/vie_submit-article-details', vie_submitArticleDetailsController);
app.use('/api/vie_submit-author-details', vie_submitAuthorDetailsController);
app.use('/api/vie_manuscripts/user/:userId', vie_getManuscriptsByUserController)
// vbe submit manuscript routes
app.use('/api/vih_submit-manuscript-file',  upload.single('file'), vih_submitManuscriptFileController);
app.use('/api/vih_submit-article-details', vih_submitArticleDetailsController);
app.use('/api/vih_submit-author-details', vih_submitAuthorDetailsController);
app.use('/api/vih_manuscripts/user/:userId', vih_getManuscriptsByUserController)
// auth routes
app.use('/api/login', login);
app.use('/api/signup', signup);
app.use('/api/logout', logout);
app.use('/api/checkAuth', checkAuth);
app.use('/api/reset-password', updatePassword);
// add article routes vbe
app.use('/api/vbe_add-article', vbe_saveArticleDetailsController);
app.use('/api/vbe_getallarticles', vbe_getAllArticlesController);
app.use('/api/vbe_getarticle/:id', vbe_getArticleByIdController);
// add article routes vbh
app.use('/api/vbh_add-article', vbh_saveArticleDetailsController);
app.use('/api/vbh_getallarticles', vbh_getAllArticlesController);
app.use('/api/vbh_getarticle/:id', vbh_getArticleByIdController);
// add article routes vie
app.use('/api/vie_add-article', vie_saveArticleDetailsController);
app.use('/api/vie_getallarticles', vie_getAllArticlesController);
app.use('/api/vie_getarticle/:id', vie_getArticleByIdController);
// add article routes vih
app.use('/api/vih_add-article', vih_saveArticleDetailsController);
app.use('/api/vih_getallarticles', vih_getAllArticlesController);
app.use('/api/vih_getarticle/:id', vih_getArticleByIdController);
connectToDatabase(); // Verify database connection

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
