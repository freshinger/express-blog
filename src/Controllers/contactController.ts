import { Request, Response } from "express";

export const contactController = (req: Request, res: Response) => {
  res.render("../views/contact.html", {});
};
