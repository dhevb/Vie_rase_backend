import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../utils/db'; // Ensure this path is correct
import { generateToken } from '../utils/authUtils'; // Import your token generation utility

export const signup = async (req: Request, res: Response) => {
  const { email, password, institution, role, areaOfStudy } = req.body;

  if (!email || !password || !institution || !role || !areaOfStudy) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if ((existingUser as any).length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 13);

    // Insert new user into the database
    const [result] = await pool.query('INSERT INTO users (email, password, institution, role, area_of_study) VALUES (?, ?, ?, ?, ?)', [
      email,
      hashedPassword,
      institution,
      role,
      areaOfStudy,
    ]);

    res.status(201).json({ id: (result as any).insertId, email });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
}

// Function to handle user login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Fetch user from the database
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = (rows as any)[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate authentication token
    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
}
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
