"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AddArticle_vbe_Controller_1 = require("../controllers/AddArticle_vbe_Controller");
const router = (0, express_1.Router)();
router.post('/api/vbe_add-article', AddArticle_vbe_Controller_1.vbe_saveArticleDetailsController);
router.get('/api/vbe_getallarticles', AddArticle_vbe_Controller_1.vbe_getAllArticlesController);
router.get('/api/vbe_getarticle/:id', AddArticle_vbe_Controller_1.vbe_getArticleByIdController); // New route
exports.default = router;
