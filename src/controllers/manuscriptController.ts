import { Request, Response } from 'express';
import axios from 'axios'; // Add axios to make HTTP requests
import { submitAuthorDetails, updateManuscriptFile, updateArticleDetails } from '../models/manuscriptModel';

// Controller to handle author details submission
export const submitAuthorDetailsController = async (req: Request, res: Response) => {
  try {
    const {
      author_name,
      author_email,
      author_designation,
      author_organization,
      author_mobile,
      co_authors = [],
      user_id,
    } = req.body;

    if (!Array.isArray(co_authors)) {
      return res.status(400).json({ error: 'Co-authors must be an array.' });
    }

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const result = await submitAuthorDetails({
      author_name,
      author_email,
      author_designation,
      author_organization,
      author_mobile,
      co_authors,
      user_id,
    });

    res.status(200).json({ 
      message: 'Author and co-author details submitted successfully', 
      manuscriptId: result.manuscriptId,
    });
  } catch (err) {
    console.error('Error submitting author and co-author details:', err);
    res.status(500).json({ error: 'An error occurred while submitting author details. Please try again later.' });
  }
};

// Controller to handle manuscript file upload using Vercel Blob API
export const submitManuscriptFileController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded. Please upload a manuscript file.' });
    }

    const fileBuffer = req.file.buffer;
    const originalname = req.file.originalname;
    const mimetype = req.file.mimetype;
    const manuscriptId = Number(req.body.manuscriptId);
    const user_id = req.body.userId;

    if (isNaN(manuscriptId) || manuscriptId <= 0) {
      return res.status(400).json({ error: 'Invalid manuscript ID. Please provide a valid manuscript ID.' });
    }

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    // Upload the file to Vercel Blob via REST API
    const response = await axios.post('https://api.vercel.com/v2/blob', fileBuffer, {
      headers: {
        'Content-Type': mimetype,
        'Authorization': process.env.MANUSCRIPT_TOKEN, // Replace with your Vercel access token
      },
      params: {
        fileName: originalname,
      }
    });

    const fileUrl = response.data.url; // Get the file URL from the API response

    // Pass the file URL and other details to the model function
    await updateManuscriptFile(manuscriptId, fileUrl, user_id);
    res.status(200).json({ message: 'Manuscript file uploaded successfully', fileUrl });
  } catch (err) {
    console.error('Error uploading manuscript file:', err);
    res.status(500).json({ error: 'An error occurred while uploading the manuscript file. Please try again later.' });
  }
};

// Controller to handle article details submission
export const submitArticleDetailsController = async (req: Request, res: Response) => {
  try {
    const manuscriptId = Number(req.body.manuscriptId);
    const user_id = req.body.userId;

    if (isNaN(manuscriptId) || manuscriptId <= 0) {
      return res.status(400).json({ error: 'Invalid manuscript ID. Please provide a valid manuscript ID.' });
    }

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    await updateArticleDetails(manuscriptId, req.body, user_id);
    res.status(200).json({ message: 'Article details submitted successfully' });
  } catch (err) {
    console.error('Error submitting article details:', err);
    res.status(500).json({ error: 'An error occurred while submitting article details. Please try again later.' });
  }
};
