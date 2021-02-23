import { IProjectFrontmatter } from "./frontmatters.interfaces";

export interface IGetProjects_project {
  htmlString: string;
  frontmatter: IProjectFrontmatter;
}

export interface IGetProjectsOutput {
  projects: IGetProjects_project[];
}
