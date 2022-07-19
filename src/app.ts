import express from "express";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import postRouter from "./routes/postRouter";
import { AppDataSource } from "./data-source";
import bodyParser from "body-parser";

(async () => {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.error(error);
  }

  const PORT = process.env.PORT ?? 5000;
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api", userRouter);
  app.use("/api", authRouter);
  app.use("/api", postRouter);

  app.listen(PORT, () => console.log("server is on process..."));
})();
