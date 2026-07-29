import express from "express";
import { Route } from "express";
import { registerStaff,staffDetails,updateStaff } from "../controllers/staff.controller.js";
import {isLoggedIn, isUserAdminAndHrAndAccounts,isUserHrandAdmin} from '../middlewares/auth.middleware.js';
const router = express.Router();
/**POST /staff/register */
router.post('/register',isLoggedIn,isUserHrandAdmin,registerStaff);
/**GET /staff/details */
router.get('/details',isLoggedIn,isUserAdminAndHrAndAccounts,staffDetails);
/** PATCH /staff/update/:_id */
router.patch('/update/:_id',isLoggedIn,isUserHrandAdmin,updateStaff);
export default router