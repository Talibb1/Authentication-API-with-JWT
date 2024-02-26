import express from "express";
const router = express.Router();
import { userRegistration, userlogin, changeUserPassword,loggedUser} from "../controller/index.js";
import checkUserAuth from "../middleware/authMiddleware.js";

// Router level Middleware To Protected Route
router.use("/changepassword", checkUserAuth);
router.use('/loggeduser', checkUserAuth);

// public Routes
router.post("/register", userRegistration);
router.post("/login", userlogin);

// private/protected Routes
router.post("/changepassword", changeUserPassword);
router.get('/loggeduser', loggedUser)

export default router;


