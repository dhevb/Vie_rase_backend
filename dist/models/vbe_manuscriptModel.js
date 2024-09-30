"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManuscriptsByUser = exports.updateArticleDetails = exports.updateManuscriptFile = exports.submitAuthorDetails = void 0;
const db_1 = require("../utils/db"); // Adjust path as necessary
// Function to submit author details and co-authors
const submitAuthorDetails = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Insert author and co-author details into the database
    const [result] = yield db_1.pool.query('INSERT INTO manuscript_vbe (author_name, author_email, author_designation, author_organization, author_mobile, userId, submission_date) VALUES (?, ?, ?, ?, ?, ?, NOW())', [data.author_name, data.author_email, data.author_designation, data.author_organization, data.author_mobile, data.user_id]);
    const manuscriptId = result.insertId;
    // Insert co-authors
    for (const coAuthor of data.co_authors) {
        yield db_1.pool.query('INSERT INTO co_authors_vbe (manuscriptId, name, email, designation, organization, mobile) VALUES (?, ?, ?, ?, ?, ?)', [manuscriptId, coAuthor.name, coAuthor.email, coAuthor.designation, coAuthor.organization, coAuthor.mobile]);
    }
    return { manuscriptId };
});
exports.submitAuthorDetails = submitAuthorDetails;
// Function to update manuscript file details
// Modify to accept Buffer for file
const updateManuscriptFile = (manuscriptId, fileBuffer, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.pool.query('UPDATE manuscript_vbe SET file_path = ?, userId = ? WHERE id = ?', [fileBuffer, user_id, manuscriptId]);
});
exports.updateManuscriptFile = updateManuscriptFile;
// Function to update article details
const updateArticleDetails = (manuscriptId, details, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.pool.query('UPDATE manuscript_vbe SET title = ?, abstract = ?, category = ?, keywords = ?, userId = ? WHERE id = ?', [details.title, details.abstract, details.category, details.keywords, user_id, manuscriptId]);
});
exports.updateArticleDetails = updateArticleDetails;
/// Function to fetch all manuscripts by a user
const getManuscriptsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [manuscripts] = yield db_1.pool.query(`
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
      `, [userId]);
        // Log the result to inspect
        console.log('Fetched manuscripts:', manuscripts);
        return { manuscripts };
    }
    catch (error) {
        console.error('Error fetching manuscripts:', error);
        throw error;
    }
});
exports.getManuscriptsByUser = getManuscriptsByUser;
