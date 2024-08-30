import { Request, Response } from 'express';
import { createManuscript } from '../models/manuscriptModel';
import { ResultSetHeader } from 'mysql2';

export const submitManuscript = async (req: Request, res: Response) => {
  const { title, abstract, file_path, author_id } = req.body;

  try {
    const result = await createManuscript({ title, abstract, file_path, author_id }) as ResultSetHeader;
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(400).json({ error: 'Error submitting manuscript' });
  }
};
