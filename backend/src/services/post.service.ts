import PostModel from '../models/post.model';
import { CreatePostDtoType, PostType } from '../types/index';

class PostService {
  async getAllProducts() {
    const posts = await PostModel.find().sort({ 'createdAt': -1 });

    return posts;
  }

  async getOneById(_id: string) {
    const post = await PostModel.findOne({ _id });

    return post;
  }

  async createPost(payload: CreatePostDtoType): Promise<PostType> {
    const post = new PostModel(payload);
    await post.save();

    return post;
  }
}

export const postService = new PostService();