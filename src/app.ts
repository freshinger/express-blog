require("dotenv").config();

import express from "express";
import nunjucks from "nunjucks";
import { aboutController } from "./Controllers/aboutController";
import { indexController } from "./Controllers/indexController";
import { contactController } from "./Controllers/contactController";
import {
  getBlogPostBySlug,
  getRandomBlogPost,
} from "./Controllers/blogPostController";

const app = express();
nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
});
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app
  .get("/", indexController)
  .get("/about", aboutController)
  .get("/post", getRandomBlogPost)
  .get("/post/:slug", getBlogPostBySlug)
  .get("/contact", contactController);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
