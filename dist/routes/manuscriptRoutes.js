"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const manuscriptController_1 = require("../controllers/manuscriptController");
const router = express_1.default.Router();
router.post('/submit_manuscript', manuscriptController_1.submitManuscript);
exports.default = router;
