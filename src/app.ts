import express from "express";
import userRouter from "./routes/userRouter";
import { AppDataSource } from "./data-source";

(async () => {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.error(error);
  }

  const PORT = process.env.PORT ?? 5000;
  const app = express();

  app.use("/api", userRouter);
  app.listen(PORT, () => console.log("server is on process..."));
})();
