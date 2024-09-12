import express from 'express';
import 'dotenv/config'; // Ensure dotenv is configured at the top of your entry file
import cors from 'cors';
import { connectToDatabase } from './utils/db'; // Adjust the path as needed
import {login} from './controllers/authController';
import {signup} from './controllers/authController';
import { updatePassword } from './controllers/authController';
import { submitArticleDetailsController } from './controllers/manuscriptController';
import {submitAuthorDetailsController } from './controllers/manuscriptController';
import { submitManuscriptFileController } from './controllers/manuscriptController';
import { getManuscriptsByUserController } from './controllers/manuscriptController';
import {logout} from './controllers/authController';
import {checkAuth} from './controllers/authController';
import {saveArticleDetailsController} from './controllers/AddArticleController';
import {getAllArticlesController} from './controllers/AddArticleController'
import {getArticleByIdController} from './controllers/AddArticleController';



import multer from 'multer';
const app = express();
const port = process.env.PORT || 3000;
const upload = multer({ dest: 'uploads/' });
app.use(cors());
app.use(express.json());

// Import your routes here
app.use('/api/reset-password', updatePassword);
app.use('/api/submit-manuscript-file',  upload.single('file'), submitManuscriptFileController);
app.use('/api/submit-article-details', submitArticleDetailsController);
app.use('/api/submit-author-details', submitAuthorDetailsController);
app.use('/api/manuscripts/user/:userId', getManuscriptsByUserController)
app.use('/api/login', login);
app.use('/api/signup', signup);
app.use('/api/logout', logout);
app.use('/api/checkAuth', checkAuth);
app.use('/api/reset-password', updatePassword);
app.use('/api/add-article', saveArticleDetailsController);
app.use('/api/getallarticles', getAllArticlesController);
app.use('/api/getarticle/:id', getArticleByIdController);
connectToDatabase(); // Verify database connection

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
