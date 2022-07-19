import * as express from "express";
import { postController } from "../controllers/postController";
import { checkJwt } from "../middleware/checkJwt";

const router = express.Router();

router.post("/user/setpost", postController.createPost);


export default router;