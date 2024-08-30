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
exports.createManuscript = exports.getManuscriptById = void 0;
// Adjust import based on your actual export in `db.ts`
const db_1 = require("../utils/db");
const getManuscriptById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.pool.query('SELECT * FROM manuscripts WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
});
exports.getManuscriptById = getManuscriptById;
const createManuscript = (manuscript) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db_1.pool.query('INSERT INTO manuscripts SET ?', [manuscript]);
    return result;
});
exports.createManuscript = createManuscript;
