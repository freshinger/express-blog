import { Request, Response } from "express";

export const loginController = async (req: Request, res: Response) => {
  res.render("../views/admin/login.html", {});
};
