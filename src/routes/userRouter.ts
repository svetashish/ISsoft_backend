import * as express from "express";
import { userController } from "../controllers/userController";
import bodyParser from "body-parser";

const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/users", jsonParser, userController.createUser);
router.get("/users", userController.getAllUsers);
router.post("/check", jsonParser, userController.checkUser);
router.delete("/user", jsonParser, userController.deleteUser);
router.put("/user", jsonParser, userController.updateData);

export default router;
