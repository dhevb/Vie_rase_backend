import { pool } from '../utils/db'; // Adjust path as necessary

// Function to submit author details and co-authors
export const submitAuthorDetails = async (data: {
  author_name: string;
  author_email: string;
  author_designation: string;
  author_organization: string;
  author_mobile: string;
  co_authors: Array<{
    name: string;
    email: string;
    designation: string;
    organization: string;
    mobile: string;
  }>;
  user_id: string;
}) => {
  // Insert author and co-author details into the database
  const [result] = await pool.query(
    'INSERT INTO manuscript_vih (author_name, author_email, author_designation, author_organization, author_mobile, userId, submission_date) VALUES (?, ?, ?, ?, ?, ?, NOW())',
    [data.author_name, data.author_email, data.author_designation, data.author_organization, data.author_mobile, data.user_id]
  );

  const manuscriptId = (result as any).insertId;

  // Insert co-authors
  for (const coAuthor of data.co_authors) {
    await pool.query(
      'INSERT INTO co_authors_vih (manuscriptId, name, email, designation, organization, mobile) VALUES (?, ?, ?, ?, ?, ?)',
      [manuscriptId, coAuthor.name, coAuthor.email, coAuthor.designation, coAuthor.organization, coAuthor.mobile]
    );
  }

  return { manuscriptId };
};

// Function to update manuscript file details
export const updateManuscriptFile = async (manuscriptId: number, filePath: string, user_id: string) => {
  await pool.query(
    'UPDATE manuscript_vih SET file_path = ?, userId = ? WHERE id = ?',
    [filePath, user_id, manuscriptId]
  );
};

// Function to update article details
export const updateArticleDetails = async (manuscriptId: number, details: any, user_id: string) => {
  await pool.query(
    'UPDATE manuscript_vih SET title = ?, abstract = ?, category = ?, keywords = ?, userId = ? WHERE id = ?',
    [details.title, details.abstract, details.category, details.keywords, user_id, manuscriptId]
  );
};


/// Function to fetch all manuscripts by a user
export const getManuscriptsByUser = async (userId: string) => {
  try {
    // Query to fetch manuscripts for the user with author details, file path, article details, and formatted created_at date
    const [manuscripts] = await pool.query(
      `
        SELECT 
          m.id AS id,
          m.title AS title,
          m.abstract AS abstract,
          m.category AS category,
          m.keywords AS keywords,
          m.file_path AS file_path,
          DATE_FORMAT(m.created_at, '%Y-%m-%d %H:%i:%s') AS created_at, -- Format created_at to YYYY-MM-DD HH:MM:SS
          m.author_name AS author_name,
          m.author_email AS author_email,
          m.author_designation AS author_designation,
          m.author_organization AS author_organization,
          m.author_mobile AS author_mobile,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'name', c.name,
              'email', c.email,
              'designation', c.designation,
              'organization', c.organization,
              'mobile', c.mobile
            )
          ) AS co_authors_vih
        FROM manuscript_vih m
        LEFT JOIN co_authors_vih c ON m.id = c.manuscriptId
        WHERE m.userId = ?
        GROUP BY m.id
        ORDER BY m.created_at DESC
      `,
      [userId]
    );

    // Log the result to inspect
    console.log('Fetched manuscripts:', manuscripts);

    return { manuscripts };
  } catch (error) {
    console.error('Error fetching manuscripts:', error);
    throw error;
  }
};
