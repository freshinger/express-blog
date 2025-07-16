import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { adminController } from "./admin/adminController";

const encode = (str: string): string =>
  Buffer.from(str, "binary").toString("base64");

export const credentialsController = async (req: Request, res: Response) => {
  const validationresult = validationResult(req);
  if (validationresult.isEmpty()) {
    const username = req.body.username;
    const password = req.body.password;

    res.setHeader(
      "Authorization",
      "Basic " + encode(`${username}:${password}`),
    );
    adminController(req, res);
    return;
  }

  res.render("../views/admin/login.html", {});
};
