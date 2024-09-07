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
exports.updateArticleDetails = exports.updateManuscriptFile = exports.submitAuthorDetails = void 0;
const db_1 = require("../utils/db"); // Adjust path as necessary
const submitAuthorDetails = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Insert author and co-author details into the database
    const [result] = yield db_1.pool.query('INSERT INTO manuscript (author_name, author_email, author_designation, author_organization, author_mobile, userId) VALUES (?, ?, ?, ?, ?, ?)', [data.author_name, data.author_email, data.author_designation, data.author_organization, data.author_mobile, data.user_id]);
    const manuscriptId = result.insertId;
    // Insert co-authors
    for (const coAuthor of data.co_authors) {
        yield db_1.pool.query('INSERT INTO co_authors (manuscriptId, name, email, designation, organization, mobile) VALUES (?, ?, ?, ?, ?, ?)', [manuscriptId, coAuthor.name, coAuthor.email, coAuthor.designation, coAuthor.organization, coAuthor.mobile]);
    }
    return { manuscriptId };
});
exports.submitAuthorDetails = submitAuthorDetails;
// Function to update manuscript file details
const updateManuscriptFile = (manuscriptId, filePath, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    // Update the manuscript record with the provided file path and userId
    yield db_1.pool.query('UPDATE manuscript SET file_path = ?, userId = ? WHERE id = ?', [filePath, user_id, manuscriptId]);
});
exports.updateManuscriptFile = updateManuscriptFile;
// Function to update article details
const updateArticleDetails = (manuscriptId, details, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    // Update the manuscript record with the provided article details and userId
    yield db_1.pool.query('UPDATE manuscript SET title = ?, abstract = ?, category = ?, userId = ? WHERE id = ?', [details.title, details.abstract, details.category, user_id, manuscriptId]);
});
exports.updateArticleDetails = updateArticleDetails;
