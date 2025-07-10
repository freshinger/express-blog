require("dotenv").config();

import express from "express";
import nunjucks from "nunjucks";
import posts from "./data/blog.json";
import { blogPost, blogPostWithId, IBlogPost } from "./classes/blogPost";

const app = express();
nunjucks.configure("src/templates", {
  autoescape: true,
  express: app,
});
const port = process.env.PORT || 3000;

app.use(express.static("public"));

function readyData(data: IBlogPost[]): blogPostWithId[] {
  return data.map((post, i) => {
    return new blogPostWithId(
      post.title,
      post.image,
      post.author,
      post.createdAt,
      post.teaser,
      post.content,
      i,
    );
  });
}

function getPostById(
  data: blogPostWithId[],
  id: number,
): blogPostWithId | null {
  const filteredPosts = data.filter((post) => post.id === id);
  if (filteredPosts.length === 0) return null;
  return filteredPosts[0];
}

app.get("/", (req, res) => {
  const blogPosts = readyData(posts);

  res.render("index.html", {
    posts: blogPosts,
    date: (unixtimestamp: number) => {
      return new Date(unixtimestamp * 1000).toLocaleString();
    },
  });
});
app.get("/about", (req, res) => {
  res.render("about.html", {});
});
app.get("/post", (req, res) => {
  const randomid = Math.floor(Math.random() * posts.length);
  const blogPosts = readyData(posts);
  const singlePost = getPostById(blogPosts, randomid);

  res.render("post.html", { post: singlePost });
});
app.get("/post/:id", (req, res) => {
  const blogPosts = readyData(posts);
  const singlePost = getPostById(blogPosts, Number.parseInt(req.params.id));
  if (singlePost === null) res.sendStatus(404);
  res.render("post.html", { id: req.params.id, post: singlePost });
});
app.get("/contact", (req, res) => {
  res.render("contact.html", {});
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
