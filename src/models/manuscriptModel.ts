import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Adjust import based on your actual export in `db.ts`
import {pool} from '../utils/db';

interface Manuscript {
  id: number;
  title: string;
  abstract: string;
  file_path: string;
  author_id: number;
  created_at: Date;
  updated_at: Date;
}

export const getManuscriptById = async (id: number): Promise<Manuscript | null> => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM manuscripts WHERE id = ?', [id]);
  return rows.length > 0 ? (rows[0] as Manuscript) : null;
};

export const createManuscript = async (manuscript: {
  title: string;
  abstract: string;
  file_path: string;
  author_id: number;
}) => {
  const [result] = await pool.query<ResultSetHeader>('INSERT INTO manuscripts SET ?', [manuscript]);
  return result;
};
