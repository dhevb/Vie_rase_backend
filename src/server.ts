import express from 'express';
import 'dotenv/config'; // Ensure dotenv is configured at the top of your entry file
import cors from 'cors';
import { connectToDatabase } from './utils/db'; // Adjust the path as needed

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Import your routes here
// app.use('/api', routes);

connectToDatabase(); // Verify database connection

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
