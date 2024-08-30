import { Request, Response } from 'express';
import { createManuscript, getManuscriptById, updateManuscriptDetails } from '../models/manuscriptModel';
import { ResultSetHeader } from 'mysql2';

// Endpoint to handle manuscript file submission
export const submitManuscriptFile = async (req: Request, res: Response) => {
  const { author_id } = req.body;
  const file = req.file as Express.Multer.File;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const file_path = file.path;

  try {
    // Create a new manuscript entry with file_path and author_id
    const result = await createManuscript({ file_path, author_id }) as ResultSetHeader;
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(400).json({ error: 'Error submitting manuscript file' });
  }
};

// Endpoint to handle article details submission
export const submitArticleDetails = async (req: Request, res: Response) => {
  const { id, title, abstract, category } = req.body;

  try {
    // Check if the manuscript exists
    const manuscript = await getManuscriptById(id);
    if (!manuscript) {
      return res.status(404).json({ error: 'Manuscript not found' });
    }

    // Update the manuscript with article details
    await updateManuscriptDetails(id, { title, abstract, category });

    res.status(200).json({ message: 'Article details updated successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error updating article details' });
  }
};
