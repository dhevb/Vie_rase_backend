import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'; // Updated to use bcryptjs
import { pool } from '../utils/db'; // Ensure this path is correct
import { generateToken } from '../utils/authUtils'; // Import your token generation utility
import { blacklistToken } from '../utils/tokenUtils'; // Import your token blacklisting utility

// Signup function
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

// Check authentication status
export const checkAuth = (req: Request, res: Response) => {
  // The verifyTokenMiddleware will attach the user info to req.user
  res.status(200).json({ message: 'User is logged in', user: (req as any).user });
};

// Handle user login
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

    // Respond with user details and token
    res.json({
      token,
      userId: user.id,
      email: user.email,
      institution: user.institution,
      role: user.role,
      areaOfStudy: user.area_of_study,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

// Update password
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
}

// Logout function
export const logout = async (req: Request, res: Response) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer <token>

  if (token) {
    try {
      // Optional: Blacklist the token to prevent further use
      await blacklistToken(token); // Add this token to the blacklist or perform server-side cleanup

      // Send response indicating successful logout
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      // Handle errors, possibly related to token blacklisting
      console.error('Error during logout:', error);
      res.status(500).json({ error: 'Error logging out' });
    }
  } else {
    // Handle case where no token is provided
    res.status(400).json({ error: 'No token provided' });
  }
}
