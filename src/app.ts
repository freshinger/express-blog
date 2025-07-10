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
  let blogPostTitles = new Map<string, number>();
  return data.map((post, i) => {
    const blogPost = new blogPostWithId(
      post.title,
      post.image,
      post.author,
      post.createdAt,
      post.teaser,
      post.content,
      i,
    );
    //increment slug if it already exixts
    if (!blogPostTitles.has(blogPost.slug)) {
      blogPostTitles.set(blogPost.slug, 0);
    } else {
      let index = blogPostTitles.get(blogPost.slug);
      if (index !== undefined) {
        if (
          index !==
          Number.parseInt(blogPost.slug.slice(blogPost.slug.lastIndexOf("-")))
        ) {
          index++;
          blogPostTitles.set(blogPost.slug, index);
          blogPost.slug += "-" + index.toString();
        } else {
          index++;
          blogPostTitles.set(blogPost.slug, index);
          blogPost.slug =
            blogPost.slug.slice(0, blogPost.slug.lastIndexOf("-")) + index;
        }
      }
    }
    return blogPost;
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

function getPostBySlug(
  data: blogPostWithId[],
  slug: string,
): blogPostWithId | null {
  const filteredPosts = data.filter((post) => post.slug === slug);
  if (filteredPosts.length === 0) return null;
  return filteredPosts[0];
}

app.get("/", (req, res) => {
  const blogPosts = readyData(posts);

  res.render("index.html", {
    posts: blogPosts,
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

app.get("/post/:slug", (req, res) => {
  const blogPosts = readyData(posts);

  const singlePost = getPostBySlug(blogPosts, req.params.slug);
  if (singlePost === null) res.sendStatus(404);
  res.render("post.html", { post: singlePost });
});

app.get("/contact", (req, res) => {
  res.render("contact.html", {});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
