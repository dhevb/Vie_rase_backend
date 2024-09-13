"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AddArticle_vie_Controller_1 = require("../controllers/AddArticle_vie_Controller");
const router = (0, express_1.Router)();
router.post('/api/vie_add-article', AddArticle_vie_Controller_1.vie_saveArticleDetailsController);
router.get('/api/vie_getallarticles', AddArticle_vie_Controller_1.vie_getAllArticlesController);
router.get('/api/vie_getarticle/:id', AddArticle_vie_Controller_1.vie_getArticleByIdController); // New route
exports.default = router;
