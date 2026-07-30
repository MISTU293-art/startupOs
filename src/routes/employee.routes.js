import express from "express";
import { Router } from "express";

import { EmployeeTask } from "../controllers/employee.controller.js";
import {isLoggedIn} from '../middlewares/auth.middleware.js'
const router = express.Router();

/** GET /employee/tasks */
router.get('/tasks',isLoggedIn,EmployeeTask);
export default router