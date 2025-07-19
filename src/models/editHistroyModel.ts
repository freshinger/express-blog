import { getDB } from "../db/database";
import sqlite3 from "sqlite3";

export async function createEditHistory(id: number): Promise<sqlite3.Database> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    return db.run(
      `
      INSERT INTO 
        blog_entries_edit_history
      ( 
        title,
        image,
        author,
        createdAt,
        teaser,
        content,
        slug,
        historyTo,
        editedAt
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
