import { Request, Response } from "express";
//TODO: use bearer token instead of basic auth.
export const loginController = async (req: Request, res: Response) => {
  res.render("../views/admin/login.html", {});
};
