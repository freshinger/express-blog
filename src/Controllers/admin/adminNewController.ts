import { Request, Response } from "express";
import { createNewPost } from "../../models/blogPostsModel";
import { validationResult } from "express-validator";
import { blogPost } from "../../classes/blogPost";

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
  } else {
    res.sendStatus(400);
    //res.status(400).render("../views/admin/index.html");
  }
};
