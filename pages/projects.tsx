import React from "react";
import { Layout } from "../components/layout";
import { iStyled } from "../styles/theme";
import fs from "fs";
import { Project } from "../components/project";
import path from "path";
import marked from "marked";
import matter from "gray-matter";
import { NextPage } from "next";

// ------------------------
//    Styled Components
// ------------------------

const Main = iStyled.main`
  width: 100%;
  padding: 8rem 0;
  max-width: 1000px;
`;

const ProjectsList = iStyled.ul`
  width: 100%;
  display: grid;
  place-items: center;
  gap: 10rem;
`;

// ------------------------
//    Main Component
// ------------------------

interface IProjectsPage {
  projects: IProject[];
}

const ProjectsPage: NextPage<IProjectsPage> = ({ projects }) => {
  return (
    <Layout pageTitle="Projects">
      <Main>
        <ProjectsList>
          {projects.map((project, i) => {
            return <Project project={project} key={i} />;
          })}
        </ProjectsList>
      </Main>
    </Layout>
  );
};

interface IFrontMatter {
  title: string;
  date: string;
  techs: string[];
}

interface IProject {
  htmlString: string;
  frontMatter: IFrontMatter;
}

export const getStaticProps = async () => {
  const files = fs.readdirSync("posts/projects");
  const projects: IProject[] = files.map((fileName) => {
    const metadata = fs
      .readFileSync(path.join("posts", "projects", fileName))
      .toString();
    const result = matter(metadata);
    const htmlString = marked(result.content);
    const frontMatter = result.data as IFrontMatter;
    return { htmlString, frontMatter };
  });
  return {
    props: {
      projects,
    },
  };
};

export default ProjectsPage;
