import 'dotenv/config'; // Ensure dotenv is configured at the top of your entry file

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connectToDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully at',process.env.DB_PORT);
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error('Database connection failed:', (error as Error).message);
  }
};

export { connectToDatabase, pool };
