import { blogPost, IBlogPost } from "../classes/blogPost";
import { getDB } from "../db/database";
import sqlite3 from "sqlite3";

export async function getAllBlogPosts(): Promise<blogPost[]> {
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
        blog_entries;`,
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

export async function getBlogPostCount(): Promise<number> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.get<{ numberOfPosts: number }>(
      `SELECT 
        COUNT(*) as numberOfPosts
      FROM 
        blog_entries;`,
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

export async function getBlogPostByID(id: number): Promise<blogPost> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    return db.get<blogPost>(
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
        blog_entries
      WHERE
       id = ?;`,
      id,
      (err: Error | null, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  });
}

export async function getBlogPostBySlug(slug: string): Promise<blogPost> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    return db.get<blogPost>(
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
        blog_entries
      WHERE
       slug = ? ORDER BY createdAt DESC LIMIT 1;`,
      slug,
      (err, row) => {
        resolve(row);
      },
    );
  });
}

/**
 * inserts a new blogpost and returns the id on success
 *
 * @param post
 * @returns
 */

export async function createNewPost(post: IBlogPost): Promise<number> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    const insertStatement = db.prepare(
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
      VALUES
      (
      null,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
      );`,
    );
    insertStatement.run(
      post.title,
      post.image,
      post.author,
      post.createdAt,
      post.teaser,
      post.content,
      post.slug, //TODO: use slug factory
    );
    insertStatement.finalize();
    db.get(
      `select last_insert_rowid() as id;`,
      (err: Error | null, row: { id: number }) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.id);
        }
      },
    );
  });
}

/**
 * Deletes a Post and stores it into history table
 * @param id
 * @returns
 */
export async function deletePost(id: number): Promise<sqlite3.Database> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    return db.run(`DELETE FROM blog_entries WHERE id = ?;`, id, resolve(db));
  });
}

/**
 *
 * @param id edits a post and stores it's history
 * @param blogPost
 * @returns
 */
export async function editPost(
  id: number,
  blogPost: IBlogPost,
): Promise<sqlite3.Database> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    return db.run(
      `UPDATE  
            blog_entries
          SET
              title = ?,
              author = ?,
              createdAt = ?,
              teaser = ?,
              content = ?
            WHERE
            id = ?;`,
      [
        blogPost.title,
        blogPost.author,
        blogPost.createdAt,
        blogPost.teaser,
        blogPost.content,
        id,
      ],
      resolve(db),
    );
  });
}
export async function createHistory(id: number): Promise<sqlite3.Database> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    return db.run(
      `
      INSERT INTO 
        blog_entries_history
      ( 
        title,
        image,
        author,
        createdAt,
        teaser,
        content,
        slug,
        historyTo
      ) 
        SELECT 
          title,
          image,
          author,
          createdAt,
          teaser,
          content,
          slug,
          id
        FROM
          blog_entries  
        WHERE 
          id = ?;`,
      id,
      resolve(db),
    );
  });
}
