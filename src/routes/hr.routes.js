import express  from "express";
import { Route } from "express";
import multer from "multer";
import { AllStaffsDetails,assignTask } from "../controllers/hr.controller.js";
import {isLoggedIn, isUserAdminAndHrAndAccounts ,isUserHrandAdmin} from '../middlewares/auth.middleware.js'
const router = express.Router();
/** GET /hr/staffs */
router.get('/staffs',isLoggedIn,isUserHrandAdmin,AllStaffsDetails);
/** POST /hr/assign-task */
const upload = multer({storage:multer.memoryStorage()});
router.post('/assign-task',isLoggedIn,isUserHrandAdmin,upload.single('additionalFile'),assignTask);
export default router;