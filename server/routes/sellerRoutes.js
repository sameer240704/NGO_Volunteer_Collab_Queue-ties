import express from "express";
import { getSellerById, getSellerByUserId, createSeller, updateSeller, deleteSeller, getSeller } from "../controllers/market/seller.controller.js";
import { upload } from "../middlewares/multer.middleware.js";   

const router = express.Router();

router.get("/:sellerId", getSellerById);
router.get("/", getSeller);
router.get("/user/:userId", getSellerByUserId);
router.post("/create", upload.single('image'), createSeller);
router.patch("/:sellerId", updateSeller);
router.delete("/:sellerId", deleteSeller);

export default router;