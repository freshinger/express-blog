import { Request, Response } from "express";

import {
  getBlogPostBySlug,
  getBlogPostByID,
  getBlogPostCount,
  getAllBlogPosts,
} from "../models/blogPostsModel";

export const getRandomBlogPost = async (req: Request, res: Response) => {
  const posts = await getAllBlogPosts();
  const randomid = Math.floor(Math.random() * posts.length);

  const singlePost = await getBlogPostByID(posts[randomid]?.id);

  res.render("../views/post.html", { post: singlePost });
};

export const getBlogPost = async (req: Request, res: Response) => {
  const singlePost = await getBlogPostBySlug(req.params.slug);
  if (singlePost === null) res.sendStatus(404);
  res.render("../views/post.html", { post: singlePost });
};
