import { IBlogPost } from "./blogPost";

/**
 * a slug is used in the url. slugs have to be unique for SEO and web crawler purposes.
 * this factoy ensures that the slug is unique.
 *
 * @param blogPost
 * @returns
 */
//TODO: refactor to use DB
export function slugFactory(blogPost: IBlogPost): IBlogPost {
  let blogPostTitles = new Map<string, number>(); // get all existing blog post slugs from blog table and history
  //increment slug if it already exixts
  if (!blogPostTitles.has(blogPost.slug)) {
    blogPostTitles.set(blogPost.slug, 0);
  } else {
    let index = blogPostTitles.get(blogPost.slug);
    if (index !== undefined) {
      if (
        index !==
        Number.parseInt(blogPost.slug.slice(blogPost.slug.lastIndexOf("-")))
      ) {
        index++;
        blogPostTitles.set(blogPost.slug, index);
        blogPost.slug += "-" + index.toString();
      } else {
        index++;
        blogPostTitles.set(blogPost.slug, index);
        blogPost.slug =
          blogPost.slug.slice(0, blogPost.slug.lastIndexOf("-")) + index;
      }
    }
  }
  return blogPost;
}
