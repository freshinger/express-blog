require("dotenv").config();

import express from "express";
import nunjucks from "nunjucks";
import posts from "./data/blog.json";

const app = express();
nunjucks.configure("src/templates", {
  autoescape: true,
  express: app,
});
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.html", {
    posts,
    date: (unixtimestamp: number) => {
      return new Date(unixtimestamp*1000).toLocaleString();
    }
  });
});
app.get("/about", (req, res) => {
  res.render("about.html", {});
});
app.get("/post", (req, res) => {
  res.render("post.html", { posts});
});
app.get("/contact", (req, res) => {
  res.render("contact.html", {});
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
