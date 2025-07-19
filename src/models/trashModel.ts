import { blogPost } from "../classes/blogPost";
import { getDB } from "../db/database";

export async function getAllBlogPostsFromTrash(): Promise<blogPost[]> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.all<blogPost>(
      `SELECT 
        id, 
        title,
        image,
        author,
        createdAt,
        teaser,
        content,
        slug 
      FROM 
        blog_entries_delete_history 
      WHERE 
        id NOT IN (SELECT h.id FROM blog_entries_delete_history h, blog_entries b WHERE h.historyTo = b.id)
      ORDER BY 
       createdAt DESC;`,
      [],
      (err: Error | null, rows: blogPost[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      },
    );
  });
}
