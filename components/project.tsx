import React, { useEffect, useRef } from "react";
import { iStyled } from "../styles/theme";

// ------------------------
//    Interfaces
// ------------------------

interface IFrontMatter {
  title: string;
  date: string;
  techs: string[];
}

interface IProject {
  htmlString: string;
  frontMatter: IFrontMatter;
}

interface IProjectProps {
  project: IProject;
}

// ------------------------
//    Styled Components
// ------------------------

const ProjectLi = iStyled.li`
  width: 100%;
  max-width: 750px;
  display: grid;
  gap: 2rem;
`;

const Title = iStyled.h2`
  font-size: 2.2rem;
`;

const Article = iStyled.article`
  span {
    margin: 2rem 0;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  img{
      width: 100%;
      max-width: 750px;
  }
  p {
    font-family: "Nanum Gothic", sans-serif;
    line-height: 1.7rem;
  }
`;

const TechsList = iStyled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, max-content));
  gap: 1rem;
  font-weight: 300;
`;

// ------------------------
//    Main Component
// ------------------------

export const Project: React.FC<IProjectProps> = ({ project }) => {
  const projectRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    let prevRatio = 0;
    const getThresholds = () => {
      const thresholds = [];
      const steps = 20;
      for (let i = 1; i <= steps; i++) {
        const ratio = i / steps;
        thresholds.push(ratio);
      }
      thresholds.push(0);
      return thresholds;
    };

    const intersectionObserverCallback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[]
    ) => {
      entries.forEach((entry) => {
        if (projectRef.current) {
          if (entry.intersectionRatio > prevRatio) {
            projectRef.current.style.opacity = entry.intersectionRatio * 2 + "";
          } else {
          }
          prevRatio = entry.intersectionRatio;
        }
      });
    };

    if (projectRef.current) {
      const intersactionObserver = new IntersectionObserver(
        intersectionObserverCallback,
        { threshold: getThresholds() }
      );
      intersactionObserver.observe(projectRef.current);
    }
  }, []);

  return (
    <ProjectLi ref={projectRef}>
      <Title>{project.frontMatter.title}</Title>
      <Article dangerouslySetInnerHTML={{ __html: project.htmlString }} />
      <TechsList>
        {project.frontMatter.techs.map((tech, i) => (
          <li key={i}>{tech}</li>
        ))}
      </TechsList>
    </ProjectLi>
  );
};
