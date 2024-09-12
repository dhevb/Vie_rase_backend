import { Request, Response } from 'express';
import { saveArticleDetails, getAllArticlesFromDB, getArticleById } from '../models/AddArticleModel';

export const saveArticleDetailsController = async (req: Request, res: Response) => {
  try {
    const articleData = req.body;

    if (!articleData) {
      return res.status(400).json({ error: 'No data provided.' });
    }

    const articleId = await saveArticleDetails(articleData);
    res.status(201).json({
      message: 'Article details saved successfully',
      articleId
    });
  } catch (err) {
    console.error('Error saving article details:', err);
    res.status(500).json({ error: 'An error occurred while saving article details. Please try again later.' });
  }
};

// New controller function to get all articles
export const getAllArticlesController = async (req: Request, res: Response) => {
  try {
    const articles = await getAllArticlesFromDB();
    res.status(200).json(articles);
  } catch (err) {
    console.error('Error retrieving articles:', err);
    res.status(500).json({ error: 'An error occurred while retrieving articles. Please try again later.' });
  }
};

// New controller function to get an article by ID
export const getArticleByIdController = async (req: Request, res: Response) => {
  try {
    const articleId = parseInt(req.params.id, 10);

    if (isNaN(articleId)) {
      return res.status(400).json({ error: 'Invalid article ID.' });
    }

    const article = await getArticleById(articleId);

    if (!article) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    res.status(200).json(article);
  } catch (err) {
    console.error('Error retrieving article:', err);
    res.status(500).json({ error: 'An error occurred while retrieving the article. Please try again later.' });
  }
};
