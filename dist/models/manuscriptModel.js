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
exports.updateManuscriptDetails = exports.getManuscriptById = exports.createManuscript = void 0;
const db_1 = require("../utils/db"); // Ensure the path is correct
// Create a new manuscript record
const createManuscript = (manuscript) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.pool.query('INSERT INTO manuscripts (file_path, author_id, title, abstract, category) VALUES (?, ?, ?, ?, ?)', [manuscript.file_path, manuscript.author_id, manuscript.title || null, manuscript.abstract || null, manuscript.category || null]);
    return result;
});
exports.createManuscript = createManuscript;
// Get a manuscript by its ID
const getManuscriptById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.pool.query('SELECT * FROM manuscripts WHERE id = ?', [id]);
    return rows[0] || null;
});
exports.getManuscriptById = getManuscriptById;
// Update the manuscript details
const updateManuscriptDetails = (id, details) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.pool.query('UPDATE manuscripts SET title = ?, abstract = ?, category = ? WHERE id = ?', [details.title || null, details.abstract || null, details.category || null, id]);
});
exports.updateManuscriptDetails = updateManuscriptDetails;
