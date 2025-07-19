import { Request, Response } from "express";
import { deletePost } from "../../models/blogPostsModel";
import { validationResult } from "express-validator";
import { createDeleteHistory } from "../../models/deleteHistoryModel";

export const adminDeleteController = async (req: Request, res: Response) => {
  const validationresult = validationResult(req);
  if (validationresult.isEmpty()) {
    const ID = Number.parseInt(req.body.id);
    if (typeof ID == "number") {
      // Soft Delete
      await createDeleteHistory(ID).then(async () => await deletePost(ID));
      res.redirect("/admin");
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
};
