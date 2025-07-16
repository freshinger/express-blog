require("dotenv").config();

import express from "express";
import nunjucks from "nunjucks";
import publicRoutes from "./routes/publicRoutes";
import adminRoutes from "./routes/adminRoutes";
import { basicAuth } from "./middlewares/basicAuth";

const app = express();
nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
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
