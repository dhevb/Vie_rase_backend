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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vbe_getManuscriptsByUserController = exports.vbe_submitArticleDetailsController = exports.vbe_submitManuscriptFileController = exports.vbe_submitAuthorDetailsController = void 0;
const vbe_manuscriptModel_1 = require("../models/vbe_manuscriptModel");
const fs_1 = __importDefault(require("fs"));
// Controller to handle author details submission
const vbe_submitAuthorDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { author_name, author_email, author_designation, author_organization, author_mobile, co_authors = [], user_id } = req.body;
        if (!Array.isArray(co_authors)) {
            throw new Error('Co-authors must be an array.');
        }
        if (!user_id) {
            throw new Error('User ID is required.');
        }
        const result = yield (0, vbe_manuscriptModel_1.submitAuthorDetails)({
            author_name,
            author_email,
            author_designation,
            author_organization,
            author_mobile,
            co_authors,
            user_id
        });
        res.status(200).json({
            message: 'Author and co-author details submitted successfully',
            manuscriptId: result.manuscriptId
        });
    }
    catch (err) {
        console.error('Error submitting author and co-author details:', err);
        res.status(500).json({ error: 'An error occurred while submitting author and co-author details. Please try again later.' });
    }
});
exports.vbe_submitAuthorDetailsController = vbe_submitAuthorDetailsController;
// Controller to handle manuscript file upload (store as BLOB)
// Controller to handle manuscript file upload (store as BLOB)
const vbe_submitManuscriptFileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            console.warn('File upload attempt with no file');
            return res.status(400).json({ error: 'No file uploaded. Please upload a manuscript file.' });
        }
        const manuscriptId = Number(req.body.manuscriptId);
        const user_id = req.body.userId;
        if (isNaN(manuscriptId) || manuscriptId <= 0) {
            console.warn('Invalid manuscript ID:', manuscriptId);
            return res.status(400).json({ error: 'Invalid manuscript ID. Please provide a valid manuscript ID.' });
        }
        if (!user_id) {
            console.warn('User ID not provided');
            return res.status(400).json({ error: 'User ID is required.' });
        }
        // Read the uploaded file as binary data (BLOB)
        const fileBuffer = fs_1.default.readFileSync(req.file.path);
        console.log('Manuscript ID:', manuscriptId);
        console.log('User ID:', user_id);
        console.log('File size:', fileBuffer.length);
        // Pass fileBuffer instead of filePath
        yield (0, vbe_manuscriptModel_1.updateManuscriptFile)(manuscriptId, fileBuffer, user_id);
        res.status(200).json({ message: 'Manuscript file uploaded successfully' });
    }
    catch (err) {
        console.error('Error uploading manuscript file:', err);
        res.status(500).json({ error: 'An error occurred while uploading the manuscript file. Please try again later.' });
    }
});
exports.vbe_submitManuscriptFileController = vbe_submitManuscriptFileController;
// Controller to handle article details submission
const vbe_submitArticleDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manuscriptId = Number(req.body.manuscriptId);
        const user_id = req.body.userId;
        if (isNaN(manuscriptId) || manuscriptId <= 0) {
            console.warn('Invalid manuscript ID:', manuscriptId);
            return res.status(400).json({ error: 'Invalid manuscript ID. Please provide a valid manuscript ID.' });
        }
        if (!user_id) {
            console.warn('User ID not provided');
            return res.status(400).json({ error: 'User ID is required.' });
        }
        console.log('Received article details:', req.body);
        yield (0, vbe_manuscriptModel_1.updateArticleDetails)(manuscriptId, req.body, user_id);
        res.status(200).json({ message: 'Article details submitted successfully' });
    }
    catch (err) {
        console.error('Error submitting article details:', err);
        res.status(500).json({ error: 'An error occurred while submitting article details. Please try again later.' });
    }
});
exports.vbe_submitArticleDetailsController = vbe_submitArticleDetailsController;
// Controller to get all manuscripts submitted by a user
const vbe_getManuscriptsByUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required.' });
        }
        const manuscripts = yield (0, vbe_manuscriptModel_1.getManuscriptsByUser)(userId);
        res.status(200).json({
            message: 'Manuscripts retrieved successfully',
            manuscripts
        });
    }
    catch (err) {
        console.error('Error retrieving manuscripts:', err);
        res.status(500).json({ error: 'An error occurred while retrieving manuscripts. Please try again later.' });
    }
});
exports.vbe_getManuscriptsByUserController = vbe_getManuscriptsByUserController;
