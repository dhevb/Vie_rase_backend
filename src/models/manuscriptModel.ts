import { Pool, ResultSetHeader } from 'mysql2/promise';
import {pool} from '../utils/db'; // Ensure the path is correct

// Define the Manuscript interface
interface Manuscript {
  id: number;
  file_path: string;
  author_id: number;
  title?: string;
  abstract?: string;
  category?: string;
}

// Create a new manuscript record
export const createManuscript = async (manuscript: {
  file_path: string;
  author_id: number;
  title?: string;
  abstract?: string;
  category?: string;
}) => {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO manuscripts (file_path, author_id, title, abstract, category) VALUES (?, ?, ?, ?, ?)',
    [manuscript.file_path, manuscript.author_id, manuscript.title || null, manuscript.abstract || null, manuscript.category || null]
  );
  return result;
};

// Get a manuscript by its ID
export const getManuscriptById = async (id: number): Promise<Manuscript | null> => {
  const [rows] = await pool.query('SELECT * FROM manuscripts WHERE id = ?', [id]);
  return (rows as Manuscript[])[0] || null;
};

// Update the manuscript details
export const updateManuscriptDetails = async (id: number, details: {
  title?: string;
  abstract?: string;
  category?: string;
}) => {
  await pool.query(
    'UPDATE manuscripts SET title = ?, abstract = ?, category = ? WHERE id = ?',
    [details.title || null, details.abstract || null, details.category || null, id]
  );
};
