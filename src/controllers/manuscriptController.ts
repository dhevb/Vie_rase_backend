import { Request, Response } from 'express';
import { createManuscript } from '../models/manuscriptModel';

export const submitManuscript = async (req: Request, res: Response) => {
  const { title, abstract, filePath, authorId } = req.body;

  try {
    const result = await createManuscript({ title, abstract, filePath, authorId });
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(400).json({ error: 'Error submitting manuscript' });
  }
};
