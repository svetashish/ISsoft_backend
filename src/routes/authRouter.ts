import * as express from "express";
import { authController } from "../controllers/authController";

const router = express.Router();

router.post("/auth/login", authController.checkUser);
// router.post("/refresh", authController.refreshToken);
router.post("/auth/check", authController.checkTokenForDelete)

export default router;
