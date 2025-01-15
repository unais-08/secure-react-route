import express from "express";
import {
  checkAuth,
  deleteAllUsers,
  deleteUserById,
  getAllUsers,
  login,
  logout,
  signup,
} from "../controllers/index.js";
import { protectRoute } from "../middlewares/index.js";

const router = express.Router();

router.route("/check-auth").get(protectRoute, checkAuth);

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);

router.route("/delete-allusers").delete(deleteAllUsers);
router.route("/delete/:id").delete(deleteUserById);
router.route("/get-users").get(getAllUsers);

export { router as authRouter };
