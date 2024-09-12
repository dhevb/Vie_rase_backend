import { Router } from 'express';
import { saveArticleDetailsController,getAllArticlesController, getArticleByIdController } from '../controllers/AddArticleController';

const router = Router();

router.post('/api/add-article', saveArticleDetailsController);
router.get('/api/getallarticles', getAllArticlesController);
router.get('/api/getarticle/:id', getArticleByIdController); // New route
export default router;
