import { pool } from '../utils/db'; // Adjust the import path as necessary
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface Refrence {
  text: string;
  url: string;
}

interface ArticleData {
  DOI: string;
  ArticleInfo: {
    Received: string;
    Revised: string;
    Published: string;
    Editor: string;
  };
  ArticleDetails: {
    Title: string;
    Email: string;
    Authors: Array<{
      Name: string;
      Position: string;
      Affiliation: string;
    }>;
    CoAuthors: Array<{
      Name: string;
      Position: string;
      Affiliation: string;
    }>;
  };
  Abstract: string;
  Keywords: string;
  Heading: Array<{
    Title: string;
    Content: string;
    SubHeadings: Array<{
      SubTitle: string;
      SubContent: string;
    }>;
  }>;
  Conclusion: string;
  Recommendations: string;
  Refrences: Refrence[]; // Updated to handle an array of references
}

// Function to save article details
export const saveArticleDetails = async (articleData: ArticleData): Promise<number> => {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO article_vbh (DOI, ArticleInfo, ArticleDetails, Abstract, Keywords, Heading, Conclusion, Recommendations, Refrences) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          articleData.DOI,
          JSON.stringify(articleData.ArticleInfo),
          JSON.stringify(articleData.ArticleDetails),
          articleData.Abstract,
          articleData.Keywords,
          JSON.stringify(articleData.Heading),
          articleData.Conclusion,
          articleData.Recommendations,
          JSON.stringify(articleData.Refrences) // Convert references to JSON
        ]
      );

      // Return the insertId of the newly inserted article
      return result.insertId;

    } catch (err) {
      attempts++;
      if (attempts >= maxAttempts || !(err instanceof Error)) {
        throw new Error('Error saving article details: ' + (err instanceof Error ? err.message : 'Unknown error'));
      }
      console.log(`Attempt ${attempts} failed. Retrying...`);
    }
  }

  throw new Error('Max retry attempts reached for saving article details.');
};

// Function to get all articles from the database
export const getAllArticlesFromDB = async (): Promise<{ id: number; title: string }[]> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, JSON_UNQUOTE(JSON_EXTRACT(ArticleDetails, "$.Title")) AS title FROM article_vbh'
    );

    // Transform rows to the desired format
    const articles = rows.map(row => ({
      id: row.id,
      title: row.title,
    }));

    return articles;

  } catch (err) {
    if (err instanceof Error) {
      throw new Error('Error retrieving articles from DB: ' + err.message);
    } else {
      throw new Error('Unknown error occurred while retrieving articles.');
    }
  }
};

// Function to get an article by its ID
export const getArticleById = async (id: number): Promise<ArticleData | null> => {
  console.log(`Fetching article with ID: ${id}`);
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM article_vbh WHERE id = ?',
      [id]
    );

    console.log(`Query result: ${JSON.stringify(rows)}`);

    if (rows.length === 0) {
      console.log('No article found with the given ID.');
      return null; // No article found with the given ID
    }

    const article = rows[0] as RowDataPacket;

    const result: ArticleData = {
      DOI: article.DOI,
      ArticleInfo: JSON.parse(article.ArticleInfo as string),
      ArticleDetails: JSON.parse(article.ArticleDetails as string),
      Abstract: article.Abstract,
      Keywords: article.Keywords,
      Heading: JSON.parse(article.Heading as string),
      Conclusion: article.Conclusion,
      Recommendations: article.Recommendations,
      Refrences: JSON.parse(article.Refrences as string) // Parse references from JSON
    };

    console.log('Fetched article data:', result);

    return result;
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error retrieving article from DB:', err.message);
      throw new Error('Error retrieving article from DB: ' + err.message);
    } else {
      console.error('Unknown error occurred while retrieving article.');
      throw new Error('Unknown error occurred while retrieving article.');
    }
  }
};
