import express from "express";
import { verifyRegister } from "../middlewares/userMiddleware.js";
import { getProductsOfUser, register, verifyEmail } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", verifyRegister, register);
userRouter.get("/verifyEmail", verifyEmail);
userRouter.get("/getProductsOfUser", getProductsOfUser);

export default userRouter