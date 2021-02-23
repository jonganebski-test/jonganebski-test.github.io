import Link from "next/link";
import React from "react";
import { Layout } from "../../../components/layout";
import fs from "fs";
import { GetStaticPaths } from "next";
import path from "path";
import matter from "gray-matter";
import { getExcerpt } from "../../../common/helpers";
import { POSTS_PER_PAGE } from "../../../common/constants";

export default function Home({ posts }) {
  return (
    <Layout pageTitle="Welcome!">
      <h1>This is a test</h1>
      {posts.map((post) => {
        return (
          <div>
            <Link href="/blog/[slug]" as={"/blog/" + post.slug} key={post.slug}>
              <a>go to {post.slug}</a>
            </Link>
            <h2>{post.data.title}</h2>
            <p>{post.excerpt}</p>
          </div>
        );
      })}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("posts/blog");

  const paths = files.map((_, index) => ({
    params: { page: index + "", id: "ss" },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { page } }) => {
  console.log("page: ", page);

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
    const { data, excerpt } = matter(metadata, { excerpt: getExcerpt });
    return { slug: file.replace(".md", ""), excerpt, data };
  });
  return {
    props: {
      posts: postsOnPage,
    },
  };
};
