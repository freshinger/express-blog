import { getDB } from "../db/database";

export async function getAllSlugs(): Promise<{ slug: string }[]> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.all<{ slug: string }>(
      `SELECT 
        slug 
       FROM 
        blog_entries 
        UNION 
       SELECT 
        slug 
       FROM 
       blog_entries_delete_history
       UNION 
       SELECT 
        slug 
       FROM 
       blog_entries_edit_history;`,
      [],
      (err: Error | null, slugs: { slug: string }[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(slugs);
        }
      },
    );
  });
}
