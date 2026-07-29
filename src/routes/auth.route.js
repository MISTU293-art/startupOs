import express from "express";
import { Route } from "express";
import { AuthRegister ,loginUser,logOut} from "../controllers/access.controller.js";
const router = express.Router();
/** POST /auth/register  */
router.post('/register',AuthRegister);
/**POST /auth/login  */
router.post('/login',loginUser)
/** GET /auth/logout */
router.get('/logout',logOut)
export default router