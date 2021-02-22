import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import fs from "fs";
import path from "path";
import matter, { GrayMatterFile } from "gray-matter";
import Head from "next/head";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Layout } from "../../components/layout";

interface IBlogPostProps {
  content: string;
  excerpt: string;
  frontmatter: {
    title: string;
    date: string;
  };
}

const BlogPost: NextPage<IBlogPostProps> = ({
  frontmatter,
  excerpt,
  content,
}) => {
  return (
    <Layout pageTitle={frontmatter.title}>
      <div>{excerpt}</div>
      <ReactMarkdown
        children={content}
        renderers={{
          image: ({ alt, src, title }) => {
            console.log(alt, src, title);
            return <img alt={alt} src={src} title={title} />;
          },
        }}
      />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("posts/blog");

  const paths = files.map((fileName) => ({
    params: { slug: fileName.replace(".md", "") },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  let markdownWithMetadata;
  if (Array.isArray(slug)) {
    markdownWithMetadata = null;
  } else {
    markdownWithMetadata = fs
      .readFileSync(path.join("posts", "blog", slug + ".md"))
      .toString();
  }

  const getExcerpt = (file, options) => {
    const { content } = file;
    if (typeof content === "string") {
      const splited = content.split("\n");

      let i = 0;
      const paragraphs: string[] = [];
      while (
        paragraphs.reduce((acc, paragraph) => {
          return acc + paragraph?.length;
        }, 0) < 600 &&
        i < splited.length
      ) {
        let paragraph = splited[i];
        if (
          paragraph !== "" &&
          !paragraph?.startsWith("```") &&
          !paragraph?.startsWith("<")
        ) {
          if (paragraph.startsWith("#")) {
            paragraph = paragraph.replace(/[#]/g, "");
          }
          paragraphs.push(paragraph.trim());
        }
        ++i;
      }
      const excerpt = paragraphs.join(" ") + "...";
      file.excerpt = excerpt;
    }
  };

  const { data, content, excerpt } = matter(markdownWithMetadata, {
    // @ts-ignore
    // excerpt is wrongly typed. expect fix in future version
    excerpt: getExcerpt,
  });
  return {
    props: {
      frontmatter: {
        title: data.title,
      },
      content,
      excerpt,
    },
  };
};

export default BlogPost;
