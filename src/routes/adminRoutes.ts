import express from "express";
import {
  adminController,
  adminDeleteController,
  adminPostController,
} from "../Controllers/admin/adminController";

const router = express.Router();

router.get("/", adminController);
//router.delete("/:id", adminDeleteController);
router.post("/", adminPostController);

export default router;
