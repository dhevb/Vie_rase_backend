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
    'INSERT INTO manuscript_vbe (author_name, author_email, author_designation, author_organization, author_mobile, userId, submission_date) VALUES (?, ?, ?, ?, ?, ?, NOW())',
    [data.author_name, data.author_email, data.author_designation, data.author_organization, data.author_mobile, data.user_id]
  );

  const manuscriptId = (result as any).insertId;

  // Insert co-authors
  for (const coAuthor of data.co_authors) {
    await pool.query(
      'INSERT INTO co_authors_vbe (manuscriptId, name, email, designation, organization, mobile) VALUES (?, ?, ?, ?, ?, ?)',
      [manuscriptId, coAuthor.name, coAuthor.email, coAuthor.designation, coAuthor.organization, coAuthor.mobile]
    );
  }

  return { manuscriptId };
};

// Function to update manuscript file details
// Modify to accept Buffer for file
export const updateManuscriptFile = async (manuscriptId: number, fileBuffer: Buffer, user_id: string) => {
  await pool.query(
    'UPDATE manuscript_vbe SET file_path = ?, userId = ? WHERE id = ?',
    [fileBuffer, user_id, manuscriptId]
  );
};


// Function to update article details
export const updateArticleDetails = async (manuscriptId: number, details: any, user_id: string) => {
  await pool.query(
    'UPDATE manuscript_vbe SET title = ?, abstract = ?, category = ?, keywords = ?, userId = ? WHERE id = ?',
    [details.title, details.abstract, details.category, details.keywords, user_id, manuscriptId]
  );
};


/// Function to fetch all manuscripts by a user
export const getManuscriptsByUser = async (userId: string) => {
  try {
    const [manuscripts] = await pool.query(
      `
        SELECT 
          m.id AS id,
          m.title AS title,
          m.abstract AS abstract,
          m.category AS category,
          m.keywords AS keywords,
          m.file_path AS file_path,
          DATE_FORMAT(m.created_at, '%Y-%m-%d %H:%i:%s') AS submission_date,
          m.author_name AS author_name,
          m.author_email AS author_email,
          m.author_designation AS author_designation,
          m.author_organization AS author_organization,
          m.author_mobile AS author_mobile,
          -- Use GROUP_CONCAT for co-authors
          IFNULL(
            GROUP_CONCAT(
              CONCAT(
                '{"name": "', IFNULL(c.name, ''), '", ',
                '"email": "', IFNULL(c.email, ''), '", ',
                '"designation": "', IFNULL(c.designation, ''), '", ',
                '"organization": "', IFNULL(c.organization, ''), '", ',
                '"mobile": "', IFNULL(c.mobile, ''), '"}'
              )
              SEPARATOR ','
            ), '[]'
          ) AS co_authors
        FROM manuscript_vbe m
        LEFT JOIN co_authors_vbe c ON m.id = c.manuscriptId
        WHERE m.userId = ?
        GROUP BY m.id
        ORDER BY m.created_at DESC;
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
