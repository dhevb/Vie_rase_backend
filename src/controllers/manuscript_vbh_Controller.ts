import { Request, Response } from 'express';
import { submitAuthorDetails, updateManuscriptFile, updateArticleDetails, getManuscriptsByUser } from '../models/vbe_manuscriptModel';
import fs from 'fs';

// Controller to handle author details submission
export const vbh_submitAuthorDetailsController = async (req: Request, res: Response) => {
  try {
    const {
      author_name,
      author_email,
      author_designation,
      author_organization,
      author_mobile,
      co_authors = [],
      user_id
    } = req.body;

    if (!Array.isArray(co_authors)) {
      throw new Error('Co-authors must be an array.');
    }

    if (!user_id) {
      throw new Error('User ID is required.');
    }

    const result = await submitAuthorDetails({
      author_name,
      author_email,
      author_designation,
      author_organization,
      author_mobile,
      co_authors,
      user_id
    });

    res.status(200).json({
      message: 'Author and co-author details submitted successfully',
      manuscriptId: result.manuscriptId
    });
  } catch (err) {
    console.error('Error submitting author and co-author details:', err);
    res.status(500).json({ error: 'An error occurred while submitting author and co-author details. Please try again later.' });
  }
};

// Controller to handle manuscript file upload (store as BLOB)
// Controller to handle manuscript file upload (store as BLOB)
export const vbh_submitManuscriptFileController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      console.warn('File upload attempt with no file');
      return res.status(400).json({ error: 'No file uploaded. Please upload a manuscript file.' });
    }

    const manuscriptId = Number(req.body.manuscriptId);
    const user_id = req.body.userId;

    if (isNaN(manuscriptId) || manuscriptId <= 0) {
      console.warn('Invalid manuscript ID:', manuscriptId);
      return res.status(400).json({ error: 'Invalid manuscript ID. Please provide a valid manuscript ID.' });
    }

    if (!user_id) {
      console.warn('User ID not provided');
      return res.status(400).json({ error: 'User ID is required.' });
    }

    // Read the uploaded file as binary data (BLOB)
    const fileBuffer = fs.readFileSync(req.file.path);

    console.log('Manuscript ID:', manuscriptId);
    console.log('User ID:', user_id);
    console.log('File size:', fileBuffer.length);

    // Pass fileBuffer instead of filePath
    await updateManuscriptFile(manuscriptId, fileBuffer, user_id); 
    res.status(200).json({ message: 'Manuscript file uploaded successfully' });
  } catch (err) {
    console.error('Error uploading manuscript file:', err);
    res.status(500).json({ error: 'An error occurred while uploading the manuscript file. Please try again later.' });
  }
};


// Controller to handle article details submission
export const vbh_submitArticleDetailsController = async (req: Request, res: Response) => {
  try {
    const manuscriptId = Number(req.body.manuscriptId);
    const user_id = req.body.userId;

    if (isNaN(manuscriptId) || manuscriptId <= 0) {
      console.warn('Invalid manuscript ID:', manuscriptId);
      return res.status(400).json({ error: 'Invalid manuscript ID. Please provide a valid manuscript ID.' });
    }

    if (!user_id) {
      console.warn('User ID not provided');
      return res.status(400).json({ error: 'User ID is required.' });
    }

    console.log('Received article details:', req.body);

    await updateArticleDetails(manuscriptId, req.body, user_id);
    res.status(200).json({ message: 'Article details submitted successfully' });
  } catch (err) {
    console.error('Error submitting article details:', err);
    res.status(500).json({ error: 'An error occurred while submitting article details. Please try again later.' });
  }
};

// Controller to get all manuscripts submitted by a user
export const vbh_getManuscriptsByUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const manuscripts = await getManuscriptsByUser(userId);

    res.status(200).json({
      message: 'Manuscripts retrieved successfully',
      manuscripts
    });
  } catch (err) {
    console.error('Error retrieving manuscripts:', err);
    res.status(500).json({ error: 'An error occurred while retrieving manuscripts. Please try again later.' });
  }
};
