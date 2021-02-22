import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import { iStyled } from "../styles/theme";
import { Layout } from "../components/layout";

const Test = iStyled.div`
  color: ${({ theme }) => theme.textColor.base};
  font-size: 2rem;
`;

export default function Home({ slugs }) {
  return (
    <Layout pageTitle="Welcome!">
      <Test>This is a test</Test>
      {slugs.map((slug) => {
        return (
          <Link href="/blog/[slug]" as={"/blog/" + slug} key={slug}>
            <a>go to {slug}</a>
          </Link>
        );
      })}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync("posts/blog");
  console.log(files);
  return {
    props: {
      slugs: files.map((fileName) => fileName.replace(".md", "")),
    },
  };
};
