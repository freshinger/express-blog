require("dotenv").config();

import express from "express";
import nunjucks from "nunjucks";
import publicRoutes from "./routes/publicRoutes";
import adminRoutes from "./routes/adminRoutes";
import { basicAuth } from "./middlewares/basicAuth";
import { unescape } from "./nunjucksFilter/unescape";
import {
  connectDB,
  createBlogEntryDeleteHistoryTable,
  createBlogEntryEditHistoryTable,
  createBlogEntryTable,
} from "./db/database";
import { Database } from "sqlite3";
import { unixtimeAsString } from "./nunjucksFilter/unixtimeAsString";

const app = express();
const nunjucksEnv = nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
});

nunjucksEnv.addFilter("unescape", unescape);
nunjucksEnv.addFilter("unixtimeAsString", unixtimeAsString);

const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

connectDB()
  .then(async (db) => {
    return await createBlogEntryTable(db);
  })
  .then(async (db) => {
    return await createBlogEntryEditHistoryTable(db);
  })
  .then(async (db) => {
    return await createBlogEntryDeleteHistoryTable(db);
  })
  .then(
    () => {
      app.use(publicRoutes);

      app.use(basicAuth);
      app.use("/admin", adminRoutes);

      app.listen(port, () => {
        console.log(`Example app listening on http://localhost:${port}`);
      });
    },
    (err) => {
      console.error(err);
    },
  );
