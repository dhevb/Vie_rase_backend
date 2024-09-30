"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AddArticle_vih_Controller_1 = require("../controllers/AddArticle_vih_Controller");
const router = (0, express_1.Router)();
router.post('/api/vih_add-article', AddArticle_vih_Controller_1.vih_saveArticleDetailsController);
router.get('/api/vih_getallarticles', AddArticle_vih_Controller_1.vih_getAllArticlesController);
router.get('/api/vih_getarticle/:id', AddArticle_vih_Controller_1.vih_getArticleByIdController); // New route
exports.default = router;
