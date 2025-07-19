import { Request, Response } from "express";
import { editPost, getBlogPostByID } from "../../models/blogPostsModel";
import { validationResult } from "express-validator";
import { createEditHistory } from "../../models/editHistroyModel";

export const adminEditController = async (req: Request, res: Response) => {
  const validationresult = validationResult(req);
  if (validationresult.isEmpty()) {
    const originalPost = await getBlogPostByID(req.body.id);
    originalPost.title = req.body.title;
    originalPost.author = req.body.author;
    originalPost.content = req.body.content;
    originalPost.teaser = req.body.teaser;

    await createEditHistory(req.body.id).then(
      async () => await editPost(req.body.id, originalPost),
    );
    res.redirect("/admin");
  } else {
    res.sendStatus(400);
  }
};
