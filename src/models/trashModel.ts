import { deletedBlogPost } from "../classes/blogPost";
import { getDB } from "../db/database";

export async function getAllBlogPostsFromTrash(
  page: number,
): Promise<deletedBlogPost[]> {
  const db = getDB();
  const pageSize = Number.parseInt(process.env.PAGE_SIZE!);
  const offset = pageSize * page - pageSize;

  return new Promise((resolve, reject) => {
    db.all<deletedBlogPost>(
      `SELECT 
        id, 
        title,
        image,
        author,
        createdAt,
        teaser,
        content,
        slug, 
        deletedAt 
      FROM 
        blog_entries_delete_history 
      WHERE 
        id NOT IN (SELECT h.id FROM blog_entries_delete_history h, blog_entries b WHERE h.historyTo = b.id)
      ORDER BY 
       deletedAt DESC
       LIMIT ? OFFSET ?;`,
      [pageSize, offset],
      (err: Error | null, rows: deletedBlogPost[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      },
    );
  });
}

export async function getBlogPostCountFromTrash(): Promise<number> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.get<{ numberOfPosts: number }>(
      `SELECT 
        COUNT(*) as numberOfPosts
      FROM 
        blog_entries_delete_history 
      WHERE 
        id NOT IN (SELECT h.id FROM blog_entries_delete_history h, blog_entries b WHERE h.historyTo = b.id)
      ORDER BY 
       deletedAt DESC;`,
      [],
      (err: Error | null, numberOfPosts: { numberOfPosts: number }) => {
        if (err) {
          reject(err);
        } else {
          resolve(numberOfPosts.numberOfPosts);
        }
      },
    );
  });
}
