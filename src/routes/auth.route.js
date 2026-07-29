import express from "express";
import { Route } from "express";
import { AuthRegister ,loginUser,logOut,blockedStaff,allStaffAccessPage} from "../controllers/access.controller.js";
import { isLoggedIn,isUserAdminAndHrAndAccounts,isUserHrandAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();
/** POST /auth/register  */
router.post('/register',isLoggedIn,isUserHrandAdmin,AuthRegister);
/**POST /auth/login  */
router.post('/login',loginUser)
/** GET /auth/logout */
router.get('/logout',logOut);
/** PATCH /auth/blocked */
router.patch('/blocked/:_id',isLoggedIn,isUserHrandAdmin,blockedStaff);
/**GET /auth/staffs */
router.get('/staffs',isLoggedIn,isUserHrandAdmin,allStaffAccessPage);
export default router