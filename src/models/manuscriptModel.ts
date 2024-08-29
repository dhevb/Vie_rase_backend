import pool from '../utils/db';

export const getManuscriptById = async (id: number) => {
  const [rows] = await pool.query('SELECT * FROM manuscripts WHERE id = ?', [id]);
  return rows[0];
};

export const createManuscript = async (manuscript: {
  title: string;
  abstract: string;
  filePath: string;
  authorId: number;
}) => {
  const [result] = await pool.query('INSERT INTO manuscripts SET ?', [manuscript]);
  return result;
};
