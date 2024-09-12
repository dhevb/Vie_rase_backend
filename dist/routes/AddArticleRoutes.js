"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AddArticleController_1 = require("../controllers/AddArticleController");
const router = (0, express_1.Router)();
router.post('/api/add-article', AddArticleController_1.saveArticleDetailsController);
router.get('/api/getallarticles', AddArticleController_1.getAllArticlesController);
router.get('/api/getarticle/:id', AddArticleController_1.getArticleByIdController); // New route
exports.default = router;
