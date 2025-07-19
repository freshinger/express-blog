import express from "express";
import { aboutController } from "../Controllers/aboutController";
import {
  getRandomBlogPost,
  getBlogPost,
} from "../Controllers/blogPostController";
import { contactController } from "../Controllers/contactController";
import { indexController } from "../Controllers/indexController";
import { loginController } from "../Controllers/loginController";
import { credentialsController } from "../Controllers/credentialsController";
import { body, query } from "express-validator";

const router = express.Router();

router
  .get(
    "/",
    query("page").if(query("page").notEmpty()).isInt().escape(),
    indexController,
  )
  .get("/about", aboutController)
  .get("/post", getRandomBlogPost)
  .get("/post/:slug", getBlogPost)
  .get("/contact", contactController)
  .get("/login", loginController)
  .post(
    "/login",
    body("username").if(body("username").notEmpty()).escape(),
    body("password").if(body("password").notEmpty()).escape(),
    credentialsController,
  );

export default router;
