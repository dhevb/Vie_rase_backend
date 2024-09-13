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
exports.vbh_getArticleByIdController = exports.vbh_getAllArticlesController = exports.vbh_saveArticleDetailsController = void 0;
const AddArticle_vbh_Model_1 = require("../models/AddArticle_vbh_Model");
const vbh_saveArticleDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleData = req.body;
        if (!articleData) {
            return res.status(400).json({ error: 'No data provided.' });
        }
        const articleId = yield (0, AddArticle_vbh_Model_1.saveArticleDetails)(articleData);
        res.status(201).json({
            message: 'Article details saved successfully',
            articleId
        });
    }
    catch (err) {
        console.error('Error saving article details:', err);
        res.status(500).json({ error: 'An error occurred while saving article details. Please try again later.' });
    }
});
exports.vbh_saveArticleDetailsController = vbh_saveArticleDetailsController;
// New controller function to get all articles
const vbh_getAllArticlesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield (0, AddArticle_vbh_Model_1.getAllArticlesFromDB)();
        res.status(200).json(articles);
    }
    catch (err) {
        console.error('Error retrieving articles:', err);
        res.status(500).json({ error: 'An error occurred while retrieving articles. Please try again later.' });
    }
});
exports.vbh_getAllArticlesController = vbh_getAllArticlesController;
// New controller function to get an article by ID
const vbh_getArticleByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleId = parseInt(req.params.id, 10);
        if (isNaN(articleId)) {
            return res.status(400).json({ error: 'Invalid article ID.' });
        }
        const article = yield (0, AddArticle_vbh_Model_1.getArticleById)(articleId);
        if (!article) {
            return res.status(404).json({ error: 'Article not found.' });
        }
        res.status(200).json(article);
    }
    catch (err) {
        console.error('Error retrieving article:', err);
        res.status(500).json({ error: 'An error occurred while retrieving the article. Please try again later.' });
    }
});
exports.vbh_getArticleByIdController = vbh_getArticleByIdController;
