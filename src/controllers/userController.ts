import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepositories";

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const allUsers = await userRepository.find();
      res.json(allUsers);
    } catch (error) {
      console.error(error);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await userRepository.create(req.body);
      const results = await userRepository.save(user);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.json({ error: `${error.detail}` });
    }
  }

  async checkUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const checkedUser = await userRepository.find({
        where: {
          email,
          password,
        },
      });

      res.json(checkedUser);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const deletedUser = await userRepository.delete({
        email,
      });

      res.json(`Count of deleted users: ${deletedUser.affected}`);
    } catch (error) {
      console.error(error);
    }
  }

  async updateData(req: Request, res: Response) {
    try {
      const user = await userRepository.findOneBy({
        email: req.body.email,
      });

      userRepository.merge(user, req.body);
      const results = await userRepository.save(user);
      return res.send(results);
    } catch (error) {
      console.error(error);
    }
  }
}

export const userController = new UserController();
