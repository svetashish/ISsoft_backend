import { Request, Response } from "express";
import { userRepository } from "../repositories/repositories";
import { User } from "../entity/User";
import { responseUserObject } from "../helpers/resporceUser";

const deletedProps = [
  "accessToken",
  "password",
  "refreshToken",
  "hashPassword",
];

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const allUsers = await userRepository.find({
        relations: {
          posts: true,
        },
      });
      const result = allUsers.map((user) =>
        responseUserObject(user, deletedProps)
      );
      res.json(result);
    } catch (error) {
      console.error(error);
    }
  }

  async getUserbyEmail(req: Request, res: Response) {
    try {
      const { email } = req.query;

      const user = await userRepository.findOne({
        where: { email: `${email}` },
        relations: {
          posts: true,
        },
      });

      if (!user) {
        res.status(404).send("Email not found");
        return;
      }

      const responseUser = responseUserObject(user, deletedProps);
      res.json(responseUser);
    } catch (error) {
      console.error(error);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = new User(email, password);
      user.hashPassword();
      await userRepository.save(user);

      res.status(200).send("Everything is Ok");
    } catch (error) {
      console.error(error);
      res.json({ error: `${error.detail}` });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const deletedUser = await userRepository.delete({
        email,
      });

      res.json({ message: `Count of deleted users: ${deletedUser.affected}` });
    } catch (error) {
      console.error(error);
    }
  }

  async updateData(req: Request, res: Response) {
    try {
      const user = await userRepository.findOneBy({
        email: req.body.email,
      });

      if (!user) {
        res.status(404).send("Email not found");
        return;
      }

      userRepository.merge(user, req.body);
      await userRepository.save(user);

      res.status(200).send("Everything is Ok");
    } catch (error) {
      console.error(error);
    }
  }
}

export const userController = new UserController();
