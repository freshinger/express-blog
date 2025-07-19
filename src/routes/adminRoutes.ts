import express from "express";
import { body, query } from "express-validator";
import { adminBlogListController } from "../Controllers/admin/adminBlogListController";
import { adminController } from "../Controllers/admin/adminController";
import { adminDeleteController } from "../Controllers/admin/adminDeleteController";
import { adminEditController } from "../Controllers/admin/adminEditController";
import { adminEditFormController } from "../Controllers/admin/adminEditFormController";
import { adminNewController } from "../Controllers/admin/adminNewController";
import { adminNewFormController } from "../Controllers/admin/adminNewFormController";
import { adminTrashController } from "../Controllers/admin/trash/adminTrashController";
import { adminRestoreController } from "../Controllers/admin/trash/adminRestoreController";

const router = express.Router();

router
  .get(
    "/",
    query("page").if(query("page").notEmpty()).isInt().escape(),
    adminController,
  )
  .get(
    "/blogList.html",
    query("page").if(query("page").notEmpty()).isInt().escape(),
    adminBlogListController,
  )
  .post(
    "/delete",
    body("id").notEmpty().isInt().escape(),
    adminDeleteController,
  )
  .get(
    "/editPost.html",
    query("id").notEmpty().isInt().escape(),
    adminEditFormController,
  )
  .post(
    "/edit",
    body("id").notEmpty().isInt().escape(),
    body("author").if(body("author").notEmpty()).escape(),
    //body("title").if(body("title").notEmpty()).escape(),
    body("title").notEmpty().escape(),
    body("teaser").if(body("teaser").notEmpty()).escape(),
    body("image").if(body("image").notEmpty()).escape(),
    body("content").if(body("content").notEmpty()).escape(),
    adminEditController,
  )
  .get(
    "/newPost.html",
    query("id").notEmpty().isInt().escape(),
    adminNewFormController,
  )
  .post(
    "/new",
    body("author").if(body("author").notEmpty()).escape(),
    //body("title").if(body("title").notEmpty()).escape(),
    body("title").notEmpty().escape(),
    body("teaser").if(body("teaser").notEmpty()).escape(),
    body("image").if(body("image").notEmpty()).escape(),
    body("content").if(body("content").notEmpty()).escape(),
    adminNewController,
  )
  .get(
    "/trash.html",
    query("page").if(query("page").notEmpty()).isInt().escape(),
    adminTrashController,
  )
  .post(
    "/restore",
    body("id").notEmpty().isInt().escape(),
    adminRestoreController,
  );

export default router;
