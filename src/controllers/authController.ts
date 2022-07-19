import { Request, Response } from "express";
import { userRepository } from "../repositories/repositories";
import jwt from "jsonwebtoken";
import config from "../config/config";

class AuthController {
  async checkUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const checkedUser = await userRepository.findOneBy({
        email,
      });

      if (checkedUser) {
        if (!checkedUser.checkIfUnencryptedPasswordIsValid(password)) {
          res.json(null);
          return;
        } else {
          const accessToken = jwt.sign(
            { username: checkedUser.email },
            config.accessTokenSecret,
            { expiresIn: "1d" }
          );
          const refreshToken = jwt.sign(
            { username: checkedUser.email },
            config.refreshTokenSecret,
            { expiresIn: "20d" }
          );
          userRepository.merge(checkedUser, { accessToken, refreshToken });
          await userRepository.save(checkedUser);

          res.json({
            accessToken,
            refreshToken,
          });
        }
      } else {
        res.json(checkedUser);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async checkTokenForDelete(req: Request, res: Response) {
    const { token } = req.body;   
    const jwtPayloadEmail = jwt.decode(token.accessToken);

    res.json(jwtPayloadEmail);
  }

  async refreshToken(req: Request, res: Response) {
    const { email, token } = req.body;
    const user = await userRepository.findOneBy({
      email,
      refreshToken: token.refreshToken,
    });
    console.log(user);
  }
}

export const authController = new AuthController();
