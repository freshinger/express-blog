require("dotenv").config();

import express from "express";
import nunjucks from "nunjucks";
import publicRoutes from "./routes/publicRoutes";
import adminRoutes from "./routes/adminRoutes";
import { basicAuth } from "./middlewares/basicAuth";

const app = express();
const nunjucksEnv = nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
});

nunjucksEnv.addFilter("unescape", function (str) {
  const replaceArray = (subject: string, find: string[], replace: string[]) => {
    let replaceString = subject;
    var regex;
    for (var i = 0; i < find.length; i++) {
      regex = new RegExp(find[i], "g");
      replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
  };

  let find = ["&amp;", "&gt;", "&lt;", "&quot;", "&#39;", "&#x2F;"];
  let replace = ["&", ">", "<", '"', "'", "/"];

  return replaceArray(str, find, replace);
});

const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(publicRoutes);

app.use(basicAuth);
app.use("/admin", adminRoutes);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
