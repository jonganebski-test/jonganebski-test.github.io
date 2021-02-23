import React from "react";
import { Layout } from "../components/layout";
import { styled } from "../styles/theme";
import fs from "fs";
import { Project } from "../components/project";
import path from "path";
import marked from "marked";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import {
  IGetProjectsOutput,
  IGetProjects_project,
} from "../interfaces/get-projects.interfaces";
import { IProjectFrontmatter } from "../interfaces/frontmatters.interfaces";

// ------------------------
//    Styled Components
// ------------------------

const Main = styled.main`
  width: 100%;
  padding: 8rem 0;
  max-width: 1000px;
`;

const ProjectsList = styled.ul`
  width: 100%;
  display: grid;
  place-items: center;
  gap: 10rem;
`;

// ------------------------
//    Main Component
// ------------------------

const ProjectsPage: NextPage<IGetProjectsOutput> = ({ projects }) => {
  return (
    <Layout pageTitle="Projects">
      <Main>
        <ProjectsList>
          {projects.map((project, i) => {
            return <Project {...project} key={i} />;
          })}
        </ProjectsList>
      </Main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<IGetProjectsOutput> = async () => {
  const files = fs.readdirSync("src/posts/projects");
  const projects: IGetProjects_project[] = files.map((fileName) => {
    const metadata = fs
      .readFileSync(path.join("src", "posts", "projects", fileName))
      .toString();
    const result = matter(metadata);
    const htmlString = marked(result.content);
    const frontmatter = result.data as IProjectFrontmatter;
    return { htmlString, frontmatter };
  });
  return {
    props: {
      projects,
    },
  };
};

export default ProjectsPage;
