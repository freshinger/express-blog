import { Request, Response } from "express";
import { readyData } from "../util/readyData";
import { getAllBlogPosts } from "../models/blogPostsModel";
import { blogPostWithId } from "../classes/blogPost";

function paginate(
  posts: blogPostWithId[],
  pageSize: number,
  page: number,
): blogPostWithId[] {
  const pages: blogPostWithId[][] = [];

  for (let i = 0; i < posts.length; i += pageSize) {
    const chunk = posts.slice(i, i + pageSize);
    pages.push(chunk);
  }
  if (pages.length > page) {
    return pages[page];
  }
  return [];
}

export const indexController = async (req: Request, res: Response) => {
  let pageSize = 5;
  if (typeof req.query != undefined && typeof req.query.pageSize === "string") {
    pageSize = Number.parseInt(req.query.pageSize);
  }

  let page = 0;
  if (typeof req.query != undefined && typeof req.query.page === "string") {
    page = Number.parseInt(req.query.page);
  }

  const posts = await getAllBlogPosts();
  let blogPosts;
  if (typeof posts !== "boolean") {
    blogPosts = readyData(posts);
  }
  if (typeof blogPosts !== "undefined") {
    blogPosts = paginate(blogPosts, pageSize, page);
  }

  res.render("../views/index.html", {
    posts: blogPosts,
    page,
  });
};
