import { Request, Response } from "express";
import { deletePost, getAllBlogPosts } from "../../models/blogPostsModel";
import { readyData } from "../../util/readyData";

export const adminController = async (req: Request, res: Response) => {
  const blogPosts = await getAllBlogPosts();

  if (typeof blogPosts !== "boolean") {
    const posts = readyData(blogPosts);

    res.render("../views/admin/index.html", { posts });
  }
};

export const adminPostController = async (req: Request, res: Response) => {
  if (req.body.action && req.body.action == "delete") {
    await adminDeleteController(req, res);
  }
};

export const adminDeleteController = async (req: Request, res: Response) => {
  const ID = Number.parseInt(req.body.id);
  if (typeof ID == "number") {
    const result = await deletePost(ID);
    if (result) {
      res.redirect("/admin");
    } else {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(500);
  }
};
