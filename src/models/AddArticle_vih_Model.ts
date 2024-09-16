import { pool } from '../utils/db'; // Adjust the import path as necessary
import { ResultSetHeader, RowDataPacket } from 'mysql2';

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
  Refrences:string;
}

// Function to save article details
export const saveArticleDetails = async (articleData: ArticleData): Promise<number> => {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO article_vih (DOI, ArticleInfo, ArticleDetails, Abstract, Keywords, Heading, Conclusion, Recommendations,Refrences) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`,
        [
          articleData.DOI,
          JSON.stringify(articleData.ArticleInfo),
          JSON.stringify(articleData.ArticleDetails),
          articleData.Abstract,
          articleData.Keywords,
          JSON.stringify(articleData.Heading),
          articleData.Conclusion,
          articleData.Recommendations,
          articleData.Refrences
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
      'SELECT id, JSON_UNQUOTE(JSON_EXTRACT(ArticleDetails, "$.Title")) AS title FROM article_vih'
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
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM article_vih WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return null; // No article found with the given ID
    }

    const article = rows[0] as RowDataPacket;

    return {
      DOI: article.DOI,
      ArticleInfo: JSON.parse(article.ArticleInfo as string),
      ArticleDetails: JSON.parse(article.ArticleDetails as string),
      Abstract: article.Abstract,
      Keywords: article.Keywords,
      Heading: JSON.parse(article.Heading as string),
      Conclusion: article.Conclusion,
      Recommendations: article.Recommendations,
      Refrences:article.Refrences
    };
  } catch (err) {
    if (err instanceof Error) {
      throw new Error('Error retrieving article from DB: ' + err.message);
    } else {
      throw new Error('Unknown error occurred while retrieving article.');
    }
  }
};
