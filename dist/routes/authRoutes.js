"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authController_2 = require("../controllers/authController");
const tokenUtils_1 = require("../utils/tokenUtils");
const router = express_1.default.Router();
router.post('/api/login', authController_1.login);
router.post('/api/signup', authController_1.signup);
router.post('/api/reset-password', authController_1.updatePassword);
router.get('/api/check-auth', tokenUtils_1.blacklistToken, authController_2.checkAuth);
exports.default = router;
