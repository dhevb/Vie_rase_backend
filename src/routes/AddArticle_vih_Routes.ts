import { Router } from 'express';
import {  vih_saveArticleDetailsController,vih_getAllArticlesController, vih_getArticleByIdController } from '../controllers/AddArticle_vih_Controller';

const router = Router();

router.post('/api/vih_add-article', vih_saveArticleDetailsController);
router.get('/api/vih_getallarticles', vih_getAllArticlesController);
router.get('/api/vih_getarticle/:id', vih_getArticleByIdController); // New route
export default router;
