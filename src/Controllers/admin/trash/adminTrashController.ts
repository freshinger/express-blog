import { getAllBlogPostsFromTrash } from "../../../models/trashModel";
import { Request, Response } from "express";

export const adminTrashController = async (req: Request, res: Response) => {
  const posts = await getAllBlogPostsFromTrash();
  res.render("../views/admin/trash/trash.html", { posts });
};
