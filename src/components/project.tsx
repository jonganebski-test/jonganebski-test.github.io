import React, { useEffect, useRef } from "react";
import { IGetProjects_project } from "../interfaces/get-projects.interfaces";
import { styled } from "../styles/theme";

// ------------------------
//    Styled Components
// ------------------------

const ProjectLi = styled.li`
  width: 100%;
  max-width: 750px;
  display: grid;
`;

const Title = styled.h2`
  font-size: 2.2rem;
`;

const Article = styled.article`
  img {
    width: 100%;
    max-width: 750px;
    box-shadow: 5px 20px 25px -5px rgba(0, 0, 0, 0.05),
      5px 10px 10px 5px rgba(0, 0, 0, 0.04);
  }
  p {
    margin: 2rem 0;
    font-family: "Nanum Gothic", sans-serif;
    line-height: 1.7rem;
  }
`;

const TechsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, max-content));
  gap: 1rem;
  font-weight: 300;
`;

// ------------------------
//    Main Component
// ------------------------

export const Project: React.FC<IGetProjects_project> = ({
  frontmatter,
  htmlString,
}) => {
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
      <Title>{frontmatter.title}</Title>
      <Article dangerouslySetInnerHTML={{ __html: htmlString }} />
      <TechsList>
        {frontmatter.techs.map((tech, i) => (
          <li key={i}>{tech}</li>
        ))}
      </TechsList>
    </ProjectLi>
  );
};
