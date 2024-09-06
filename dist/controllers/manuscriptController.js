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
exports.submitArticleDetailsController = exports.submitManuscriptFileController = exports.submitAuthorDetailsController = void 0;
const manuscriptModel_1 = require("../models/manuscriptModel");
// Controller to handle author details submission
const submitAuthorDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract details from request body
        const { author_name, author_email, author_designation, author_organization, author_mobile, co_authors = [], // Default to an empty array if not provided
        user_id // Extract userId from request body
         } = req.body;
        // Validate co_authors
        if (!Array.isArray(co_authors)) {
            return res.status(400).json({ error: 'Co-authors must be an array.' });
        }
        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required.' });
        }
        // Call the model function to save data
        const result = yield (0, manuscriptModel_1.submitAuthorDetails)({
            author_name,
            author_email,
            author_designation,
            author_organization,
            author_mobile,
            co_authors,
            user_id // Pass userId to the model
        });
        res.status(200).json({
            message: 'Author and co-author details submitted successfully',
            manuscriptId: result.manuscriptId // Include manuscriptId in the response
        });
    }
    catch (err) {
        console.error('Error submitting author and co-author details:', err);
        res.status(500).json({ error: 'An error occurred while submitting author and co-author details. Please try again later.' });
    }
});
exports.submitAuthorDetailsController = submitAuthorDetailsController;
// Controller to handle manuscript file upload
const submitManuscriptFileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded. Please upload a manuscript file.' });
        }
        const fileBuffer = req.file.buffer;
        const manuscriptId = Number(req.body.manuscriptId);
        const user_id = req.body.userId; // Extract userId from request body
        if (isNaN(manuscriptId) || manuscriptId <= 0) {
            return res.status(400).json({ error: 'Invalid manuscript ID. Please provide a valid manuscript ID.' });
        }
        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required.' });
        }
        // Pass the file buffer to the model function
        yield (0, manuscriptModel_1.updateManuscriptFile)(manuscriptId, fileBuffer, user_id); // Pass userId to the model
        res.status(200).json({ message: 'Manuscript file uploaded successfully' });
    }
    catch (err) {
        console.error('Error uploading manuscript file:', err);
        res.status(500).json({ error: 'An error occurred while uploading the manuscript file. Please try again later.' });
    }
});
exports.submitManuscriptFileController = submitManuscriptFileController;
// Controller to handle article details submission
const submitArticleDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manuscriptId = Number(req.body.manuscriptId);
        const user_id = req.body.userId; // Extract userId from request body
        if (isNaN(manuscriptId) || manuscriptId <= 0) {
            return res.status(400).json({ error: 'Invalid manuscript ID. Please provide a valid manuscript ID.' });
        }
        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required.' });
        }
        console.log('Received article details:', req.body); // Debugging
        yield (0, manuscriptModel_1.updateArticleDetails)(manuscriptId, req.body, user_id); // Pass userId to the model
        res.status(200).json({ message: 'Article details submitted successfully' });
    }
    catch (err) {
        console.error('Error submitting article details:', err);
        res.status(500).json({ error: 'An error occurred while submitting article details. Please try again later.' });
    }
});
exports.submitArticleDetailsController = submitArticleDetailsController;
