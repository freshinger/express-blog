import { Request, Response } from "express";

export const adminController = (req: Request, res: Response) => {
  res.render("../views/admin/index.html", {});
};
