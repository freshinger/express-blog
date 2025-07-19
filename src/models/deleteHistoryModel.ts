import { getDB } from "../db/database";
import sqlite3 from "sqlite3";

export async function createDeleteHistory(
  id: number,
): Promise<sqlite3.Database> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    return db.run(
      `
      INSERT INTO 
        blog_entries_delete_history
      ( 
        title,
        image,
        author,
        createdAt,
        teaser,
        content,
        slug,
        historyTo,
        deletedAt
      ) 
        SELECT 
          title,
          image,
          author,
          createdAt,
          teaser,
          content,
          slug,
          id,
          ?
        FROM
          blog_entries  
        WHERE 
          id = ?;`,
      Math.floor(Date.now() / 1000),
      id,
      resolve(db),
    );
  });
}
