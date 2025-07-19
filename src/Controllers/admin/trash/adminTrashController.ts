import { validationResult } from "express-validator";
import {
  getAllBlogPostsFromTrash,
  getBlogPostCountFromTrash,
} from "../../../models/trashModel";
import { Request, Response } from "express";

export const adminTrashController = async (req: Request, res: Response) => {
  const validationresult = validationResult(req);
  if (validationresult.isEmpty()) {
    let page = 1;
    if (req.query && typeof req.query.page === "string") {
      const pageParsed = Number.parseInt(req.query.page);
      if (!isNaN(pageParsed) && pageParsed > 0) {
        page = pageParsed;
      }
    }
    const pageSize = process.env.PAGE_SIZE || 10;
    const posts = await getAllBlogPostsFromTrash(page);
    const postCount = await getBlogPostCountFromTrash();

    res.render("../views/admin/trash/trash.html", {
      posts,
      pageNr: page,
      postCount,
      pageSize,
    });
  }
};
