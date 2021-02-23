import fs from "fs";
import { GetStaticPaths, NextPage } from "next";
import React from "react";
import { IGetBlogPostsOutput } from "../../../interfaces/get-blog-posts.interfaces";
import Home, { getStaticProps as IndexGetStaticProps } from "../../index";

const BlogPostsPage: NextPage<IGetBlogPostsOutput> = (props) => {
  return <Home {...props} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("src/posts/blog");

  const paths = files.map((_, index) => ({
    params: { page: index + "" },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = IndexGetStaticProps;

export default BlogPostsPage;
