import { Request, Response } from "express";

export const adminNewFormController = async (req: Request, res: Response) => {
  res.render("../views/admin/newPost.html");
};
