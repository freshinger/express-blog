import { readFile } from "node:fs/promises";
import * as path from "node:path";

const FILE_PATH = path.join(__dirname, "..", "data", "blog.json");

export async function getAllBlogPosts() {
  console.log(FILE_PATH);
  try {
    const blogPosts = await readFile(FILE_PATH, { encoding: "utf-8" });

    if (blogPosts.length === 0) {
      return [];
    }

    return JSON.parse(blogPosts);
  } catch (error) {
    return [];
  }
}
