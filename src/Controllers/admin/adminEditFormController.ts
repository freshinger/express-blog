import { Request, Response } from "express";
import { getBlogPostByID } from "../../models/blogPostsModel";
import { validationResult } from "express-validator";

export const adminEditFormController = async (req: Request, res: Response) => {
  const validationresult = validationResult(req);
  if (validationresult.isEmpty()) {
    const post = await getBlogPostByID(Number.parseInt(req.query.id as string));
    res.render("../views/admin/editPost.html", { post });
  } else {
    res.sendStatus(500);
  }
};
