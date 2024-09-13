"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AddArticle_vbh_Controller_1 = require("../controllers/AddArticle_vbh_Controller");
const router = (0, express_1.Router)();
router.post('/api/vbh_add-article', AddArticle_vbh_Controller_1.vbh_saveArticleDetailsController);
router.get('/api/vbh_getallarticles', AddArticle_vbh_Controller_1.vbh_getAllArticlesController);
router.get('/api/vbh_getarticle/:id', AddArticle_vbh_Controller_1.vbh_getArticleByIdController); // New route
exports.default = router;
