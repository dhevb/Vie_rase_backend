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
exports.getArticleById = exports.getAllArticlesFromDB = exports.saveArticleDetails = void 0;
const db_1 = require("../utils/db"); // Adjust the import path as necessary
const saveArticleDetails = (articleData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield db_1.pool.query(`INSERT INTO article (DOI, ArticleInfo, ArticleDetails, Abstract, Keywords, Heading, Conclusion, Recommendations) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
            articleData.DOI,
            JSON.stringify(articleData.ArticleInfo),
            JSON.stringify(articleData.ArticleDetails),
            articleData.Abstract,
            articleData.Keywords,
            JSON.stringify(articleData.Heading),
            articleData.Conclusion,
            articleData.Recommendations,
        ]);
        // Access insertId from ResultSetHeader
        const articleId = result.insertId;
        return articleId;
    }
    catch (err) {
        // Ensure the error is of type Error
        if (err instanceof Error) {
            throw new Error('Error saving article details: ' + err.message);
        }
        else {
            throw new Error('Unknown error occurred while saving article details.');
        }
    }
});
exports.saveArticleDetails = saveArticleDetails;
// Function to get all articles from the database
const getAllArticlesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.pool.query('SELECT id, JSON_UNQUOTE(JSON_EXTRACT(ArticleDetails, "$.Title")) AS title FROM article');
        // Transform rows to the desired format
        const articles = rows.map(row => ({
            id: row.id,
            title: row.title
        }));
        return articles;
    }
    catch (err) {
        // Ensure the error is of type Error
        if (err instanceof Error) {
            throw new Error('Error retrieving articles from DB: ' + err.message);
        }
        else {
            throw new Error('Unknown error occurred while retrieving articles.');
        }
    }
});
exports.getAllArticlesFromDB = getAllArticlesFromDB;
// Function to get an article by its ID
const getArticleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.pool.query('SELECT * FROM article WHERE id = ?', [id]);
        if (rows.length === 0) {
            return null; // No article found with the given ID
        }
        const article = rows[0]; // Assuming single row result
        return {
            DOI: article.DOI,
            ArticleInfo: JSON.parse(article.ArticleInfo),
            ArticleDetails: JSON.parse(article.ArticleDetails),
            Abstract: article.Abstract,
            Keywords: article.Keywords,
            Heading: JSON.parse(article.Heading),
            Conclusion: article.Conclusion,
            Recommendations: article.Recommendations,
        };
    }
    catch (err) {
        // Ensure the error is of type Error
        if (err instanceof Error) {
            throw new Error('Error retrieving article from DB: ' + err.message);
        }
        else {
            throw new Error('Unknown error occurred while retrieving article.');
        }
    }
});
exports.getArticleById = getArticleById;
