import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import path from "path";
import { Layout } from "../../components/layout";
import { iStyled } from "../../styles/theme";
import marked from "marked";

interface IBlogPostProps {
  htmlString: string;
  frontmatter: {
    title: string;
    date: string;
  };
}

const Main = iStyled.main`
  width: 100%;
  max-width: 750px;
`;

const Title = iStyled.h1`
  padding: 4rem 0;
  font-size: 2.3rem;
  font-weight: 600;
  line-height: 3rem;
  word-break: keep-all;
`;

const Article = iStyled.article`
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
      color: white;
    }
  }`;

const BlogPost: NextPage<IBlogPostProps> = ({ frontmatter, htmlString }) => {
  return (
    <Layout pageTitle={frontmatter.title}>
      <Main>
        <Title>{frontmatter.title}</Title>
        <Article dangerouslySetInnerHTML={{ __html: htmlString }} />
      </Main>
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

  const { data, content } = matter(markdownWithMetadata);
  const htmlString = marked(content);
  return {
    props: {
      frontmatter: {
        title: data.title,
      },
      htmlString,
    },
  };
};

export default BlogPost;
