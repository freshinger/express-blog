import { Request, Response } from "express";
import { readyData } from "../util/readyData";
import { blogPostWithId } from "../classes/blogPost";
import * as posts from "../data/blog.json";
import { getAllBlogPosts } from "../models/blogPostsModel";

function getPostById(
  data: blogPostWithId[],
  id: number,
): blogPostWithId | null {
  const filteredPosts = data.filter((post) => post.id === id);
  if (filteredPosts.length === 0) return null;
  return filteredPosts[0];
}

function getPostBySlug(
  data: blogPostWithId[],
  slug: string,
): blogPostWithId | null {
  const filteredPosts = data.filter((post) => post.slug === slug);
  if (filteredPosts.length === 0) return null;
  return filteredPosts[0];
}

export const getRandomBlogPost = async (req: Request, res: Response) => {
  const posts = await getAllBlogPosts();
  if (typeof posts !== "boolean") {
    const randomid = Math.floor(Math.random() * posts.length);

    const blogPosts = readyData(posts);
    const singlePost = getPostById(blogPosts, randomid);

    res.render("../views/post.html", { post: singlePost });
  }
};

export const getBlogPostBySlug = async (req: Request, res: Response) => {
  const posts = await getAllBlogPosts();

  if (typeof posts !== "boolean") {
    const blogPosts = readyData(posts);

    const singlePost = getPostBySlug(blogPosts, req.params.slug);
    if (singlePost === null) res.sendStatus(404);
    res.render("../views/post.html", { post: singlePost });
  }
};
