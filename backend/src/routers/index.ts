import { Router } from 'express';
import { postController } from '../controllers/post.controller';
import { productController } from '../controllers/product.controller';

const router = Router();

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getOneProductById);

router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getOnePostById);
router.post('/post', postController.createPost);

export default router;