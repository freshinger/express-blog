import { Request, Response } from "express";
import { createHistory, deletePost } from "../../models/blogPostsModel";
import { validationResult } from "express-validator";

export const adminDeleteController = async (req: Request, res: Response) => {
  const validationresult = validationResult(req);
  if (validationresult.isEmpty()) {
    const ID = Number.parseInt(req.body.id);
    if (typeof ID == "number") {
      await createHistory(ID).then(async () => await deletePost(ID));
      res.redirect("/admin");
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
};
