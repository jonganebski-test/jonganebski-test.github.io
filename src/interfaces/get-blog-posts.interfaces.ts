import { ParsedUrlQuery } from "querystring";
import { IBlogPostFrontmatter } from "./frontmatters.interfaces";

export interface IGetBlogPosts_blogPost {
  slug: string;
  excerpt: string;
  frontmatter: IBlogPostFrontmatter;
}

export interface IGetBlogPostsInput extends ParsedUrlQuery {
  page?: string;
}

export interface IGetBlogPostsOutput {
  posts: IGetBlogPosts_blogPost[];
  currentPage: number;
  totalPagesCount: number;
}
