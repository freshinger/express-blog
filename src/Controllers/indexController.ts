import { Request, Response } from "express";
import { readyData } from "../util/readyData";
import { getAllBlogPosts } from "../models/blogPostsModel";

export const indexController = async (req: Request, res: Response) => {
  const posts = await getAllBlogPosts();
  const blogPosts = readyData(posts);

  res.render("../views/index.html", {
    posts: blogPosts,
  });
};
