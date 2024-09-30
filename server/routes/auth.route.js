import { loginUser, registerUser, checkAuthentication, getUserById, logoutUser, getVolunteerById } from "../controllers/auth.controller.js";
import express from "express";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post(
    "/register",
    upload.fields([
        { name: "primaryImage", maxCount: 1 },
        { name: "ngoImages", maxCount: 5 },
    ]),
    registerUser
);
router.get("/checkAuth", checkAuthentication);
router.get("/getUser/:userId", getUserById);
router.post("/logout", logoutUser);
router.get("/getVolunteer/:volunteerId");

export default router;