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
exports.blacklistToken = void 0;
// utils/tokenUtils.ts
const db_1 = require("./db"); // Import database connection
const blacklistToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Example implementation: Insert the token into a blacklist table
        yield db_1.pool.query('INSERT INTO token_blacklist (token) VALUES (?)', [token]);
    }
    catch (error) {
        console.error('Error blacklisting token:', error);
        throw new Error('Error blacklisting token');
    }
});
exports.blacklistToken = blacklistToken;
