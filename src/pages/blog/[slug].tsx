import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import path from "path";
import { Layout } from "../../components/layout";
import { styled } from "../../styles/theme";
import marked from "marked";
import { BlogNav } from "../../components/blog-nav";
import {
  IGetBlogPostInput,
  IGetBlogPostOutput,
} from "../../interfaces/get-blog-post.interfaces";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";

const Main = styled.main`
  width: 100%;
  max-width: 750px;
`;

const Title = styled.h1`
  padding: 4rem 0;
  font-size: 2.3rem;
  font-weight: 600;
  line-height: 3rem;
  word-break: keep-all;
`;

const Article = styled.article`
  img {
    width: 100%;
    max-width: 750px;
    margin-bottom: 1rem;
  }
  .photo-reference {
    display: block;
    text-align: center;
    font-weight: 300;
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }
  h2 {
    margin-bottom: 2rem;
    font-weight: 600;
    font-size: 1.8rem;
  }
  h3 {
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 1.1rem;
  }
  p,
  ol {
    margin-bottom: 2rem;
    font-family: "Nanum Gothic", sans-serif;
    line-height: 1.8rem;
    code {
      padding: 0.2rem 0.5rem;
      background-color: ${({ theme }) => theme.bgColor.code};
      border-radius: 5px;
    }
  }
  code {
    font-family: "Inconsolata", monospace;
  }
  ol {
    padding-left: 2rem;
    list-style: decimal;
  }
  pre {
    margin-bottom: 2rem;
    line-height: 1.5rem;
    .hljs-function {
      color: ${({ theme }) => theme.textColor.base};
    }
  }
`;

const BlogPost: NextPage<IGetBlogPostOutput> = ({
  prevPost,
  currentPost,
  nextPost,
}) => {
  const articleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    console.log("bar");
    articleRef.current?.querySelectorAll("pre > code").forEach((element) => {
      hljs.highlightBlock(element as HTMLElement);
    });
    // const x = () => console.log("bar");
    // articleRef.current?.addEventListener("", x);
    // return () => articleRef.current?.removeEventListener("load", x);
  }, [articleRef.current]);

  return (
    <Layout pageTitle={currentPost.frontmatter.title}>
      <Main>
        <Title>{currentPost.frontmatter.title}</Title>
        <Article
          dangerouslySetInnerHTML={{ __html: currentPost.htmlString }}
          ref={articleRef}
        />
        <BlogNav prevPost={prevPost} nextPost={nextPost} />
      </Main>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("src/posts/blog");

  const paths = files.map((fileName) => ({
    params: { slug: fileName.replace(".md", "") },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  IGetBlogPostOutput,
  IGetBlogPostInput
> = async ({ params: { slug } }) => {
  let prevPostMetadata = "";
  let nextPostMetadata = "";
  let currentPostMetadata = "";
  let prevPostSlug = "";
  let nextPostSlug = "";
  if (!Array.isArray(slug)) {
    const files = fs.readdirSync(path.join("src", "posts", "blog")).reverse();
    currentPostMetadata = fs
      .readFileSync(path.join("src", "posts", "blog", slug + ".md"))
      .toString();
    const currentPostIndex = files.findIndex(
      (fileName) => fileName === slug + ".md"
    );
    if (currentPostIndex !== 0) {
      const prevPostFileName = files[currentPostIndex - 1];
      prevPostSlug = prevPostFileName.replace(".md", "");
      prevPostMetadata = fs
        .readFileSync(path.join("src", "posts", "blog", prevPostFileName))
        .toString();
    }
    if (currentPostIndex !== files.length - 1) {
      const nextPostFileName = files[currentPostIndex + 1];
      nextPostSlug = nextPostFileName.replace(".md", "");
      nextPostMetadata = fs
        .readFileSync(path.join("src", "posts", "blog", nextPostFileName))
        .toString();
    }
  }
  const prevPost = matter(prevPostMetadata);
  const currentPost = matter(currentPostMetadata);
  const nextPost = matter(nextPostMetadata);

  return {
    props: {
      currentPost: {
        frontmatter: {
          title: currentPost.data.title,
        },
        htmlString: marked(currentPost.content),
      },
      prevPost: prevPostSlug
        ? {
            slug: prevPostSlug,
            frontmatter: {
              title: prevPost.data.title,
            },
          }
        : null,
      nextPost: nextPostSlug
        ? {
            slug: nextPostSlug,
            frontmatter: {
              title: nextPost.data.title,
            },
          }
        : null,
    },
  };
};

export default BlogPost;
