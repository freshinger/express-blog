import { Request, Response } from "express";
import {
  deletePost,
  editPost,
  getAllBlogPosts,
  newPost,
} from "../../models/blogPostsModel";
import { readyData } from "../../util/readyData";
import { validationResult } from "express-validator";
import { blogPost } from "../../classes/blogPost";

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
  if (req.body.action && req.body.action == "edit") {
    await adminEditController(req, res);
  }
  if (req.body.action && req.body.action == "new") {
    await adminNewController(req, res);
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

export const adminEditController = async (req: Request, res: Response) => {
  const ID = Number.parseInt(req.body.id);
  if (typeof ID == "number") {
    const validationresult = validationResult(req);
    if (validationresult.isEmpty()) {
      const result = await editPost(
        ID,
        req.body.author,
        req.body.title,
        req.body.content,
      );

      if (result) {
        res.redirect("/admin");
      } else {
        res.sendStatus(500);
      }
    }
  } else {
    res.sendStatus(500);
  }
};

export const adminNewController = async (req: Request, res: Response) => {
  const validationresult = validationResult(req);
  if (validationresult.isEmpty()) {
    const blog = new blogPost(
      req.body.title,
      req.body.image,
      req.body.author,
      Math.floor(Date.now() / 1000),
      req.body.teaser,
      req.body.content,
    );
    console.log(blog);
    const result = await newPost(blog);

    if (result) {
      res.redirect("/admin");
    } else {
      res.sendStatus(500);
    }
  }
};
