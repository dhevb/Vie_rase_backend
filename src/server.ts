import express from 'express';
import 'dotenv/config'; // Ensure dotenv is configured at the top of your entry file
import cors from 'cors';
import { connectToDatabase } from './utils/db'; // Adjust the path as needed
import {login} from './controllers/authController';
import {signup} from './controllers/authController';
import { updatePassword } from './controllers/authController';
import { submitManuscriptFile } from './controllers/manuscriptController';
import { submitArticleDetails } from './controllers/manuscriptController';
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Import your routes here
app.use('/reset-password', updatePassword);
app.use('/submit-manuscript-file', submitManuscriptFile);
app.use('/submit-article-details', submitArticleDetails);
app.use('/login', login);
app.use('/signup', signup);
app.use('/reset-password', updatePassword);


connectToDatabase(); // Verify database connection

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
