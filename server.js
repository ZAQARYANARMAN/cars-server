import express from "express";
import userRouter from "./routers/userRouter.js";
import carRouter from "./routers/carRouter.js";
import "./connectDB.js";
import dotenv from "dotenv";
dotenv.config();

const server = express();

server.use(express.json());
server.use("/user", userRouter);
server.use("/car", carRouter);

server.listen(1010);

// The code may not work because .env is missing.