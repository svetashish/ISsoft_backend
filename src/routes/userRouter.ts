import * as express from "express";
import { userController } from "../controllers/userController";
import { checkJwt } from "../middleware/checkJwt";

const router = express.Router();

router.post("/user/set", userController.createUser);
router.get("/users/getAll", userController.getAllUsers);
router.get("/users/getUser", userController.getUserbyEmail);
router.delete("/user/delete", checkJwt, userController.deleteUser);
router.put("/user/update", checkJwt,  userController.updateData);


export default router;