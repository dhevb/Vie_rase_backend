import { Router } from 'express';
import { vie_saveArticleDetailsController, vie_getAllArticlesController,  vie_getArticleByIdController } from '../controllers/AddArticle_vie_Controller';

const router = Router();

router.post('/api/vie_add-article',  vie_saveArticleDetailsController);
router.get('/api/vie_getallarticles',  vie_getAllArticlesController);
router.get('/api/vie_getarticle/:id',  vie_getArticleByIdController); // New route
export default router;
