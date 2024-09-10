import { Request, Response } from 'express';
import { submitAuthorDetails, updateManuscriptFile, updateArticleDetails } from '../models/manuscriptModel';

// Controller to handle author details submission
export const submitAuthorDetailsController = async (req: Request, res: Response) => {
  try {
    // Extract details from request body
    const {
      author_name,
      author_email,
      author_designation,
      author_organization,
      author_mobile,
      co_authors = [], // Default to an empty array if not provided
      user_id // Extract userId from request body
    } = req.body;

    // Validate co_authors
    if (!Array.isArray(co_authors)) {
      throw new Error('Co-authors must be an array.');
    }

    if (!user_id) {
      throw new Error('User ID is required.');
    }

    // Call the model function to save data
    const result = await submitAuthorDetails({
      author_name,
      author_email,
      author_designation,
      author_organization,
      author_mobile,
      co_authors,
      user_id // Pass userId to the model
    });

    res.status(200).json({ 
      message: 'Author and co-author details submitted successfully', 
      manuscriptId: result.manuscriptId // Include manuscriptId in the response
    });
  } catch (err) {
    console.error('Error submitting author and co-author details:', err);
    res.status(500).json({ error: 'An error occurred while submitting author and co-author details. Please try again later.' });
  }
};

// Controller to handle manuscript file upload
export const submitManuscriptFileController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      console.warn('File upload attempt with no file'); // Debugging
      return res.status(400).json({ error: 'No file uploaded. Please upload a manuscript file.' });
    }

    const filePath = req.file.path;
    const manuscriptId = Number(req.body.manuscriptId);
    const user_id = req.body.userId; // Extract userId from request body

    if (isNaN(manuscriptId) || manuscriptId <= 0) {
      console.warn('Invalid manuscript ID:', manuscriptId); // Debugging
      return res.status(400).json({ error: 'Invalid manuscript ID. Please provide a valid manuscript ID.' });
    }

    if (!user_id) {
      console.warn('User ID not provided'); // Debugging
      return res.status(400).json({ error: 'User ID is required.' });
    }

    console.log('File path:', filePath); // Debugging
    console.log('Manuscript ID:', manuscriptId); // Debugging
    console.log('User ID:', user_id); // Debugging

    await updateManuscriptFile(manuscriptId, filePath, user_id); // Pass userId to the model
    res.status(200).json({ message: 'Manuscript file uploaded successfully' });
  } catch (err) {
    console.error('Error uploading manuscript file:', err); // Debugging
    res.status(500).json({ error: 'An error occurred while uploading the manuscript file. Please try again later.' });
  }
};
// Controller to handle article details submission
export const submitArticleDetailsController = async (req: Request, res: Response) => {
  try {
   
    const user_id = req.body.userId; // Extract userId from request body

   
    if (!user_id) {
      console.warn('User ID not provided'); // Debugging
      return res.status(400).json({ error: 'User ID is required.' });
    }

    console.log('Received article details:', req.body); // Debugging

    await updateArticleDetails(req.body, user_id); // Pass userId to the model
    res.status(200).json({ message: 'Article details submitted successfully' });
  } catch (err) {
    console.error('Error submitting article details:', err); // Debugging
    res.status(500).json({ error: 'An error occurred while submitting article details. Please try again later.' });
  }
};