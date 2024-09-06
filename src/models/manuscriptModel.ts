import { Pool } from 'mysql2/promise';
import { pool } from '../utils/db'; // Adjust path as necessary

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
    'INSERT INTO manuscript (author_name, author_email, author_designation, author_organization, author_mobile, userId) VALUES (?, ?, ?, ?, ?, ?)',
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
export const updateManuscriptFile = async (manuscriptId: number, fileBuffer: Buffer, user_id: string) => {
  try {
    // Save the buffer to a database field (requires BLOB or similar data type)
    await pool.query(
      'UPDATE manuscript SET file_data = ?, userId = ? WHERE id = ?',
      [fileBuffer, user_id, manuscriptId]
    );
  } catch (err) {
    console.error('Error updating manuscript file:', err);
    throw new Error('An error occurred while updating the manuscript file.');
  }
};
// Function to update article details
export const updateArticleDetails = async (manuscriptId: number, details: any, user_id: string) => {
  // Update the manuscript record with the provided article details and userId
  await pool.query(
    'UPDATE manuscript SET title = ?, abstract = ?, category = ?, userId = ? WHERE id = ?',
    [details.title, details.abstract, details.category, user_id, manuscriptId]
  );
};