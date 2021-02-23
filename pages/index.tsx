import fs from "fs";
import { Layout } from "../components/layout";
import { PostCard } from "../components/post-card";
import { iStyled } from "../styles/theme";
import matter from "gray-matter";
import path from "path";
import { POSTS_PER_PAGE } from "../common/constants";
import { NextPage } from "next";
import { getExcerpt } from "../common/helpers";

// ------------------------
//    Styled Components
// ------------------------

const Main = iStyled.main`
  width: 100%;
  padding: 8rem 0;
  max-width: 1000px;
`;

const BlogPostsList = iStyled.ul`
  display: grid;
  gap: 1rem;
`;

interface IFrontMatter {
  title: string;
  date: string;
  coverUrl: string;
}

interface IPost {
  slug: string;
  excerpt: string;
  frontMatter: IFrontMatter;
}

interface IHomeProps {
  posts: IPost[];
}

const Home: NextPage<IHomeProps> = ({ posts }) => {
  return (
    <Layout pageTitle="Welcome!">
      <Main>
        <BlogPostsList>
          {posts.map((post, index) => {
            return <PostCard post={post} key={index} />;
          })}
        </BlogPostsList>
      </Main>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const page = 1;
  const files = fs.readdirSync("posts/blog");
  const totalPostsCount = files.length;
  const totalPagesCount = Math.ceil(totalPostsCount / POSTS_PER_PAGE);
  const skip = (page - 1) * POSTS_PER_PAGE;
  const filesOnPage = files.slice(skip, skip + POSTS_PER_PAGE);
  const postsOnPage = filesOnPage.map((file) => {
    const metadata = fs
      .readFileSync(path.join("posts", "blog", file))
      .toString();
    // @ts-ignore
    const result = matter(metadata, { excerpt: getExcerpt });
    const excerpt = result.excerpt;
    const frontMatter = result.data as IFrontMatter;
    return { slug: file.replace(".md", ""), excerpt, frontMatter };
  });
  return {
    props: {
      posts: postsOnPage,
    },
  };
};

export default Home;
