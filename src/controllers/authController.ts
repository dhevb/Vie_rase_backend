import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../utils/db'; // Adjust path as needed

export const updatePassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email and new password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
