// utils/tokenUtils.ts
import { pool } from './db'; // Import database connection

export const blacklistToken = async (token: string) => {
  try {
    // Example implementation: Insert the token into a blacklist table
    await pool.query('INSERT INTO token_blacklist (token) VALUES (?)', [token]);
  } catch (error) {
    console.error('Error blacklisting token:', error);
    throw new Error('Error blacklisting token');
  }
};
