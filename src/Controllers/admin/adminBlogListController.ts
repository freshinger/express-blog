import { Request, Response } from "express";
import { getAllBlogPosts } from "../../models/blogPostsModel";

export const adminBlogListController = async (req: Request, res: Response) => {
  const posts = await getAllBlogPosts();
  res.render("../views/admin/blogList.html", { posts });
};
