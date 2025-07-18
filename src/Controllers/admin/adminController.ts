import { Request, Response } from "express";
import {
  createHistory,
  createNewPost,
  deletePost,
  editPost,
  getAllBlogPosts,
  getBlogPostByID,
} from "../../models/blogPostsModel";
import { validationResult } from "express-validator";
import { blogPost } from "../../classes/blogPost";

export const adminController = async (req: Request, res: Response) => {
  const posts = await getAllBlogPosts();

  res.render("../views/admin/index.html", { posts });
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
    await createHistory(ID).then(async () => await deletePost(ID));
    res.redirect("/admin");
  } else {
    res.sendStatus(500);
  }
};

export const adminEditController = async (req: Request, res: Response) => {
  const ID = Number.parseInt(req.body.id);
  if (typeof ID == "number") {
    const validationresult = validationResult(req);
    if (validationresult.isEmpty()) {
      const originalPost = await getBlogPostByID(ID);
      originalPost.title = req.body.title;
      originalPost.author = req.body.author;
      originalPost.content = req.body.content;
      originalPost.teaser = req.body.teaser;

      await createHistory(ID).then(
        async () => await editPost(ID, originalPost),
      );
      res.redirect("/admin");
    }
  } else {
    res.sendStatus(500);
  }
};

export const adminNewController = async (req: Request, res: Response) => {
  const validationresult = validationResult(req);
  if (validationresult.isEmpty()) {
    const blog = new blogPost();
    blog.title = req.body.title;
    blog.image = req.body.image;
    blog.author = req.body.author;
    blog.createdAt = Math.floor(Date.now() / 1000); //todo: save as date type
    blog.teaser = req.body.teaser;
    blog.content = req.body.content;
    blog.createSlugFromTitle();
    const result = await createNewPost(blog);

    if (result) {
      res.redirect("/admin");
    } else {
      res.sendStatus(500);
    }
  }
};
