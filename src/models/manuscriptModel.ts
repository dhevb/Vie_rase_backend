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
    'INSERT INTO manuscript (author_name, author_email, author_designation, author_organization, author_mobile, userId, submission_date) VALUES (?, ?, ?, ?, ?, ?, NOW())',
    [data.author_name, data.author_email, data.author_designation, data.author_organization, data.author_mobile, data.user_id]
  );

  const manuscriptId = (result as any).insertId;

  // Insert co-authors
  for (const coAuthor of data.co_authors) {
    await pool.query(
      'INSERT INTO co_authors (manuscriptId, name, email, designation, organization, mobile) VALUES (?, ?, ?, ?, ?, ?)',
      [manuscriptId, coAuthor.name, coAuthor.email, coAuthor.designation, coAuthor.organization, coAuthor.mobile]
    );
  }

  return { manuscriptId };
};

// Function to update manuscript file details
export const updateManuscriptFile = async (manuscriptId: number, filePath: string, user_id: string) => {
  await pool.query(
    'UPDATE manuscript SET file_path = ?, userId = ? WHERE id = ?',
    [filePath, user_id, manuscriptId]
  );
};

// Function to update article details
export const updateArticleDetails = async (manuscriptId: number, details: any, user_id: string) => {
  await pool.query(
    'UPDATE manuscript SET title = ?, abstract = ?, category = ?, keywords = ?, userId = ? WHERE id = ?',
    [details.title, details.abstract, details.category, details.keywords, user_id, manuscriptId]
  );
};


// Function to fetch all manuscripts by a user
export const getManuscriptsByUser = async (userId: string) => {
  // Query to fetch manuscripts for the user with author details, file path, article details, and formatted created_at date
  const [manuscripts] = await pool.query(
    `
      SELECT 
        m.id as manuscript_id,
        m.author_name,
        m.author_email,
        m.author_designation,
        m.author_organization,
        m.author_mobile,
        m.file_path,
        m.title as article_title,
        m.abstract as article_abstract,
        m.category as article_category,
        m.keywords as article_keywords,
        DATE_FORMAT(m.created_at, '%Y-%m-%d') as submission_date, -- Format created_at to get submission date
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'name', c.name,
            'email', c.email,
            'designation', c.designation,
            'organization', c.organization,
            'mobile', c.mobile
          )
        ) as co_authors
      FROM manuscript m
      LEFT JOIN co_authors c ON m.id = c.manuscriptId
      WHERE m.userId = ?
      GROUP BY m.id
      ORDER BY m.created_at DESC
    `,
    [userId]
  );

  return manuscripts;
};
