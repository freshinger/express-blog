import express from "express";
import {
  adminController,
  adminPostController,
} from "../Controllers/admin/adminController";
import { body } from "express-validator";

const router = express.Router();

router.get("/", adminController);

router.post(
  "/",
  body("author").if(body("author").notEmpty()).escape(),
  body("title").if(body("title").notEmpty()).escape(),
  body("teaser").if(body("teaser").notEmpty()).escape(),
  body("image").if(body("image").notEmpty()).escape(),
  body("content").if(body("content").notEmpty()).escape(),
  adminPostController,
);

export default router;
