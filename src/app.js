import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectionDB from "./configs/dbconnection.config.js";
const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
const limiter = rateLimit({
  windowMs:  60 * 1000, // 1 minutes
  max: 10, // max 10 requests per IP
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});
app.use(cors({origin:process.env.CORS_ORIGIN}))
app.use(limiter);
app.use(cookieParser());
connectionDB();
// all routes 

/* /auth/ */
import AuthRouter from './routes/auth.route.js';
app.use('/auth',AuthRouter)







export default app;
