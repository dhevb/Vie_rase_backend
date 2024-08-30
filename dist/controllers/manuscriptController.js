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
exports.submitArticleDetails = exports.submitManuscriptFile = void 0;
const manuscriptModel_1 = require("../models/manuscriptModel");
// Endpoint to handle manuscript file submission
const submitManuscriptFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { author_id } = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const file_path = file.path;
    try {
        // Create a new manuscript entry with file_path and author_id
        const result = yield (0, manuscriptModel_1.createManuscript)({ file_path, author_id });
        res.status(201).json({ id: result.insertId });
    }
    catch (error) {
        res.status(400).json({ error: 'Error submitting manuscript file' });
    }
});
exports.submitManuscriptFile = submitManuscriptFile;
// Endpoint to handle article details submission
const submitArticleDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, abstract, category } = req.body;
    try {
        // Check if the manuscript exists
        const manuscript = yield (0, manuscriptModel_1.getManuscriptById)(id);
        if (!manuscript) {
            return res.status(404).json({ error: 'Manuscript not found' });
        }
        // Update the manuscript with article details
        yield (0, manuscriptModel_1.updateManuscriptDetails)(id, { title, abstract, category });
        res.status(200).json({ message: 'Article details updated successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'Error updating article details' });
    }
});
exports.submitArticleDetails = submitArticleDetails;
