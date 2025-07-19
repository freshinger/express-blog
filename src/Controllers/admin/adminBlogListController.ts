import { Request, Response } from "express";
import { getAllBlogPosts, getBlogPostCount } from "../../models/blogPostsModel";
import { validationResult } from "express-validator";

export const adminBlogListController = async (req: Request, res: Response) => {
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
    const posts = await getAllBlogPosts(page);
    const postCount = await getBlogPostCount();
    res.render("../views/admin/blogList.html", {
      posts,
      pageSize,
      postCount,
      pageNr: page,
    });
  }
};
