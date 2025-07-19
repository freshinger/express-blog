import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { deletePost, restorePost } from "../../../models/restoreModel";

export const adminRestoreController = async (req: Request, res: Response) => {
  const validationresult = validationResult(req);
  if (validationresult.isEmpty()) {
    await restorePost(req.body.id).then(async () => {
      await deletePost(req.body.id);
    });
    res.redirect("/admin/trash.html");
  } else {
    res.sendStatus(400);
  }
};
