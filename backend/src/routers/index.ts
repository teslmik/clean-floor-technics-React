import { Router } from "express";
import { postController } from "../controllers/post.controller";
import { productController } from "../controllers/product.controller";
import { ratesController } from "../controllers/rates.controller";
import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getOneProductById);
router.put("/products/:id", productController.editOne);

router.get("/posts", postController.getAllPosts);
router.get("/posts/:id", postController.getOnePostById);
router.post("/post", postController.createPost);

router.get("/rates", ratesController.getRates);
router.put("/rates", ratesController.editRates);

router.get("/me", userController.getOneUserById);
router.post("/login", userController.login);
router.post("/register", userController.register);

export default router;
