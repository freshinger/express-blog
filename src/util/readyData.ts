import { IBlogPost, blogPostWithId } from "../classes/blogPost";

export function readyData(data: IBlogPost[]): blogPostWithId[] {
  let blogPostTitles = new Map<string, number>();
  return data.map((post, i) => {
    const blogPost = new blogPostWithId(
      post.title,
      post.image,
      post.author,
      post.createdAt,
      post.teaser,
      post.content,
      i,
    );
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
  });
}
