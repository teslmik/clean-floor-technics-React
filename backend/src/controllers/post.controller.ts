import { NextFunction, Request, Response } from "express";

import { postService } from "../services/post.service";

class PostController {
  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await postService.getAllProducts();

      return res.json(posts);
    } catch (error) {
      next(error);
    }
  }

  async getOnePostById(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await postService.getOneById(req.params.id);

      return res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await postService.createPost(req.body);

      return res.json(post);
    } catch (error) {
      next(error);
    }
  }
}

export const postController = new PostController();
