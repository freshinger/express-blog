import { getDB } from "../db/database";
import sqlite3 from "sqlite3";

/**
 * Restores a Post from Trash
 * @param id
 * @returns
 */
export async function restorePost(id: number): Promise<sqlite3.Database> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    return db.run(
      `INSERT INTO 
        blog_entries
      ( 
        id,
        title,
        image,
        author,
        createdAt,
        teaser,
        content,
        slug
      ) 
        SELECT 
          historyTo,
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
          id = ?;`,
      id,
      resolve(db),
    );
  });
}

/**
 * Deletes a Post from Trash forever
 * @param id
 * @returns
 */
export async function deletePost(id: number): Promise<sqlite3.Database> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    return db.run(
      `DELETE FROM blog_entries_delete_history WHERE id = ?;`,
      id,
      resolve(db),
    );
  });
}
