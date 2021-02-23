import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import path from "path";
import { POSTS_PER_PAGE } from "../common/constants";
import { getExcerpt } from "../common/helpers";
import { Layout } from "../components/layout";
import { Paginator } from "../components/paginator";
import { PostCard } from "../components/post-card";
import { IBlogPostFrontmatter } from "../interfaces/frontmatters.interfaces";
import {
  IGetBlogPostsInput,
  IGetBlogPostsOutput,
} from "../interfaces/get-blog-posts.interfaces";
import { styled } from "../styles/theme";

// ------------------------
//    Styled Components
// ------------------------

const Main = styled.main`
  width: 100%;
  padding: 8rem 0;
  max-width: 1000px;
`;

const BlogPostsList = styled.ul`
  display: grid;
  gap: 1rem;
`;

const Home: NextPage<IGetBlogPostsOutput> = ({
  posts,
  currentPage,
  totalPagesCount,
}) => {
  return (
    <Layout pageTitle="Welcome!">
      <Main>
        <BlogPostsList>
          {posts.map((post, index) => {
            return <PostCard {...post} key={index} />;
          })}
        </BlogPostsList>
        {1 < totalPagesCount && (
          <Paginator
            totalPagesCount={totalPagesCount}
            currentPage={currentPage}
          />
        )}
      </Main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<
  IGetBlogPostsOutput,
  IGetBlogPostsInput
> = async ({ params }) => {
  let page: number = 1;
  if (params?.page) {
    page = +params.page;
  }
  const files = fs.readdirSync("src/posts/blog");
  const totalPostsCount = files.length;
  const totalPagesCount = Math.ceil(totalPostsCount / POSTS_PER_PAGE);
  const skip = (page - 1) * POSTS_PER_PAGE;
  const filesOnPage = files.reverse().slice(skip, skip + POSTS_PER_PAGE);
  const postsOnPage = filesOnPage.map((file) => {
    const metadata = fs
      .readFileSync(path.join("src", "posts", "blog", file))
      .toString();
    // @ts-ignore
    const result = matter(metadata, { excerpt: getExcerpt });
    const excerpt = result.excerpt;
    const frontmatter = result.data as IBlogPostFrontmatter;
    return { slug: file.replace(".md", ""), excerpt, frontmatter };
  });
  return {
    props: {
      posts: postsOnPage,
      currentPage: page,
      totalPagesCount,
    },
  };
};

export default Home;
