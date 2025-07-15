import express from "express";
import { aboutController } from "../Controllers/aboutController";
import {
  getRandomBlogPost,
  getBlogPostBySlug,
} from "../Controllers/blogPostController";
import { contactController } from "../Controllers/contactController";
import { indexController } from "../Controllers/indexController";

const router = express.Router();

router
  .get("/", indexController)
  .get("/about", aboutController)
  .get("/post", getRandomBlogPost)
  .get("/post/:slug", getBlogPostBySlug)
  .get("/contact", contactController);

export default router;
