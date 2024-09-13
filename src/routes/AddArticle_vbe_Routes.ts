import { Router } from 'express';
import { vbe_saveArticleDetailsController,vbe_getAllArticlesController, vbe_getArticleByIdController } from '../controllers/AddArticle_vbe_Controller';

const router = Router();

router.post('/api/vbe_add-article', vbe_saveArticleDetailsController);
router.get('/api/vbe_getallarticles', vbe_getAllArticlesController);
router.get('/api/vbe_getarticle/:id', vbe_getArticleByIdController); // New route
export default router;
