import { Request, Response, NextFunction } from "express";

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (
    typeof ADMIN_USERNAME == "undefined" ||
    typeof ADMIN_PASSWORD == "undefined"
  ) {
    res.status(500).send("credentials are undefined");
    return;
  }
  if (ADMIN_USERNAME.indexOf(":") !== -1) {
    res.status(500).send("invalid username");
    return;
  }
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader(
      "WWW-Authenticate",
      'Basic realm="User Visible Realm", charset="UTF-8"',
    );
    res.status(401).send("Unauthorized");
    return;
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8",
  );
  const username = credentials.slice(0, credentials.indexOf(":"));
  const password = credentials.slice(credentials.indexOf(":") + 1);

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return next();
  }
  res.status(401).send("Invalid credentials");
  return;
};
