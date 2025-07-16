import { readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";
import { blogPost, IBlogPost } from "../classes/blogPost";

const FILE_PATH = path.join(__dirname, "..", "data", "blog.json");

export async function getAllBlogPosts(): Promise<IBlogPost[] | boolean> {
  try {
    const blogPosts = await readFile(FILE_PATH, { encoding: "utf-8" });

    return JSON.parse(blogPosts);
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function savePosts(posts: IBlogPost[]): Promise<boolean> {
  try {
    const blogPosts = await writeFile(FILE_PATH, JSON.stringify(posts), {
      encoding: "utf-8",
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function deletePost(id: number): Promise<boolean> {
  try {
    let blogPosts = await getAllBlogPosts();
    if (typeof blogPosts !== "boolean") {
      blogPosts.splice(id, 1);
      const success = await savePosts(blogPosts);
      return success;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function editPost(
  id: number,
  author: string,
  title: string,
  content: string,
): Promise<boolean> {
  try {
    let blogPosts = await getAllBlogPosts();
    if (typeof blogPosts !== "boolean") {
      blogPosts.map((post, i) => {
        if (i === id) {
          post.author = author;
          post.title = title;
          post.content = content;
        }
      });
      const success = await savePosts(blogPosts);
      return success;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function newPost(post: blogPost): Promise<boolean> {
  try {
    let blogPosts = await getAllBlogPosts();
    if (typeof blogPosts !== "boolean") {
      blogPosts.push(post);
      const success = await savePosts(blogPosts);
      return success;
    }
    return false;
  } catch (error) {
    return false;
  }
}
