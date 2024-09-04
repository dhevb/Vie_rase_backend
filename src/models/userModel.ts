import {pool} from '../utils/db'; // Adjust path as needed

interface User {
  id: number;
  email: string;
  password: string;
  // Add other fields as needed
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]) as [User[], any];
  return rows[0] || null;
}
export async function getUserById(id: number): Promise<User | null> {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]) as [User[], any];
  return rows[0] || null;
}
