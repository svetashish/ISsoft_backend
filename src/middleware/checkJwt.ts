import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { userRepository } from "../repositories/repositories";

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.headers.authorization.split(" ")[1];

  try {
    const jwtPayload = <any>jwt.verify(token, config.accessTokenSecret);    

  } catch (error) {
    const jwtPayload = <any>jwt.decode(token);
    console.log(jwtPayload);
    const user = await userRepository.findOneBy({
      email: jwtPayload.username,
    });
   
    const jwtPayloadRefresh = <any>jwt.verify(user.refreshToken, config.refreshTokenSecret);
    console.log(jwtPayloadRefresh);

    const accessToken = jwt.sign(
      { username: user.email },
      config.accessTokenSecret,
      { expiresIn: "1m" }
    );
    const refreshToken = jwt.sign(
      { username: user.email },
      config.refreshTokenSecret,
      { expiresIn: "20d" }
    );
    userRepository.merge(user, { accessToken, refreshToken });
    await userRepository.save(user);

    res.json({
      accessToken,
      refreshToken,
    });
    
  }

  //Call the next middleware or controller
  next();
};
