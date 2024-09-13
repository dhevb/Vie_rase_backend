import { Router } from 'express';
import { vbh_saveArticleDetailsController,vbh_getAllArticlesController, vbh_getArticleByIdController } from '../controllers/AddArticle_vbh_Controller';

const router = Router();

router.post('/api/vbh_add-article', vbh_saveArticleDetailsController);
router.get('/api/vbh_getallarticles',vbh_getAllArticlesController);
router.get('/api/vbh_getarticle/:id',vbh_getArticleByIdController); // New route
export default router;
