import { Request, Response } from "express";
import { Post } from "../entity/Post";
import { postRepository, userRepository } from "../repositories/repositories";

class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const { title, description, email } = req.body;
      const user = await userRepository.findOneBy({ email });

      if (!user) {
        res.status(404).send("Email not found");
        return;
      }
      const post = new Post(title, description, user.id);
      await postRepository.save(post);

      res.json(post);
    } catch (error) {
      console.error(error);
    }
  }
}

export const postController = new PostController();
