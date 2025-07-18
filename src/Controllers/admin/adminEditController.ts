import { Request, Response } from "express";
import {
  createHistory,
  editPost,
  getBlogPostByID,
} from "../../models/blogPostsModel";
import { validationResult } from "express-validator";

export const adminEditController = async (req: Request, res: Response) => {
  const validationresult = validationResult(req);
  if (validationresult.isEmpty()) {
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
  } else {
    res.sendStatus(400);
  }
};
