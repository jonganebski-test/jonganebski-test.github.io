import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import { iStyled } from "../styles/theme";

const Test = iStyled.div`
  color: ${({ theme }) => theme.red};
`;

export default function Home({ slugs }) {
  return (
    <>
      <Test>This is a test</Test>
      {slugs.map((slug) => {
        return (
          <Link href="/blog/[slug]" as={"/blog/" + slug} key={slug}>
            <a>go to {slug}</a>
          </Link>
        );
      })}
    </>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync("posts/blog");
  return {
    props: {
      slugs: files.map((fileName) => fileName.replace(".md", "")),
    },
  };
};
