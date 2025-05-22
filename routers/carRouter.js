import express from "express";
import { createCar, getCar, searchCar } from "../controllers/carController.js";
import { verifyToken } from "../middlewares/userMiddleware.js";

const carRouter = express.Router();

carRouter.post("/createCar", verifyToken, createCar)
carRouter.get("/searchCar", verifyToken, searchCar);
carRouter.get("/getCar", getCar)

export default carRouter