import { Request, Response } from "express";
import { getAllBlogPosts } from "../../models/blogPostsModel";
import { readyData } from "../../util/readyData";

export const adminController = async (req: Request, res: Response) => {
  const blogPosts = await getAllBlogPosts();
  const posts = readyData(blogPosts);

  res.render("../views/admin/index.html", { posts });
};
