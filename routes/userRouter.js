import express from "express";
const router = express.Router();
import { userRegistration, userlogin } from "../controller/index.js";

// public Routes
router.post("/register", userRegistration);
router.post("/login", userlogin);

// private/protected Routes
// router.post("/register", userController.userRegistration);

export default router;


