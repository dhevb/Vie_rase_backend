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
exports.submitManuscript = void 0;
const manuscriptModel_1 = require("../models/manuscriptModel");
const submitManuscript = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, abstract, file_path, author_id } = req.body;
    try {
        const result = yield (0, manuscriptModel_1.createManuscript)({ title, abstract, file_path, author_id });
        res.status(201).json({ id: result.insertId });
    }
    catch (error) {
        res.status(400).json({ error: 'Error submitting manuscript' });
    }
});
exports.submitManuscript = submitManuscript;
