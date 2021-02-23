import { ParsedUrlQuery } from "querystring";

export interface IGetBlogPost_currentBlogPost {
  frontmatter: {
    title: string;
  };
  htmlString: string;
}

export interface IGetBlogPost_prevBlogPost {
  frontmatter: {
    title: string;
  };
  slug: string;
}

export interface IGetBlogPost_nextBlogPost extends IGetBlogPost_prevBlogPost {}

export interface IGetBlogPostInput extends ParsedUrlQuery {
  slug: string;
}

export interface IGetBlogPostOutput {
  currentPost: IGetBlogPost_currentBlogPost;
  prevPost: IGetBlogPost_prevBlogPost | null;
  nextPost: IGetBlogPost_nextBlogPost | null;
}
