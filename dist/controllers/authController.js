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
exports.logout = exports.updatePassword = exports.login = exports.checkAuth = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../utils/db"); // Ensure this path is correct
const authUtils_1 = require("../utils/authUtils"); // Import your token generation utility
const tokenUtils_1 = require("../utils/tokenUtils"); // Import your token blacklisting utility
// Signup function
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, institution, role, areaOfStudy } = req.body;
    if (!email || !password || !institution || !role || !areaOfStudy) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        // Check if user already exists
        const [existingUser] = yield db_1.pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 13);
        // Insert new user into the database
        const [result] = yield db_1.pool.query('INSERT INTO users (email, password, institution, role, area_of_study) VALUES (?, ?, ?, ?, ?)', [
            email,
            hashedPassword,
            institution,
            role,
            areaOfStudy,
        ]);
        res.status(201).json({ id: result.insertId, email });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});
exports.signup = signup;
// Check authentication status
const checkAuth = (req, res) => {
    // The verifyTokenMiddleware will attach the user info to req.user
    res.status(200).json({ message: 'User is logged in', user: req.user });
};
exports.checkAuth = checkAuth;
// Handle user login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        // Fetch user from the database
        const [rows] = yield db_1.pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate authentication token
        const token = (0, authUtils_1.generateToken)(user.id);
        // Respond with user details and token
        res.json({
            token,
            userId: user.id,
            email: user.email,
            institution: user.institution,
            role: user.role,
            areaOfStudy: user.area_of_study,
        });
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});
exports.login = login;
// Update password
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
        return res.status(400).json({ error: 'Email and new password are required' });
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        yield db_1.pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
        res.status(200).json({ message: 'Password updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updatePassword = updatePassword;
// Logout function
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Extract token from Authorization header
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract token from Bearer <token>
    if (token) {
        try {
            // Optional: Blacklist the token to prevent further use
            yield (0, tokenUtils_1.blacklistToken)(token); // Add this token to the blacklist or perform server-side cleanup
            // Send response indicating successful logout
            res.status(200).json({ message: 'Logged out successfully' });
        }
        catch (error) {
            // Handle errors, possibly related to token blacklisting
            console.error('Error during logout:', error);
            res.status(500).json({ error: 'Error logging out' });
        }
    }
    else {
        // Handle case where no token is provided
        res.status(400).json({ error: 'No token provided' });
    }
});
exports.logout = logout;
