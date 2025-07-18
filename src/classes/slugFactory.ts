import { getDB } from "../db/database";
import { getAllSlugs } from "../models/blogPostsModel";

/**
 * a slug is used in the url. slugs have to be unique for SEO and web crawler purposes.
 * this factoy ensures that the slug is unique.
 *
 * @param blogPost
 * @returns
 */
export async function slugFactory(slug: string): Promise<string> {
  const db = getDB();
  // get all existing blog post slugs from blog table and history
  const slugs = await getAllSlugs();
  let blogPostSlugs = new Map<string, number>();
  let index = 0;
  slugs.forEach(({ slug }) => {
    let suffix = Number.parseInt(slug.slice(slug.lastIndexOf("-") + 1));
    blogPostSlugs.set(slug, isNaN(suffix) ? 0 : suffix);
    index++;
  });
  //increment slug if it already exists
  while (blogPostSlugs.has(slug)) {
    let incrementor = blogPostSlugs.get(slug);
    (incrementor as number)++;
    blogPostSlugs.set(slug, incrementor!);
    if (slug.indexOf("-") === -1) {
      slug += "-" + incrementor;
    } else {
      slug =
        slug.slice(0, slug.lastIndexOf("-") + 1) +
        (Number.parseInt(slug.slice(slug.lastIndexOf("-") + 1)) + 1);
    }
  }
  return slug;
}
