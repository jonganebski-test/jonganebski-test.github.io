import React from "react";
import { iStyled } from "../styles/theme";

// ------------------------
//    Styled Components
// ------------------------

const Wrapper = iStyled.footer`
  margin-top: auto;
  padding: 5rem 0 1rem 0;
  height: 10rem;
  width: 100%;
  max-width: 1000px;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.textColor.rare};
`;

const FlexDiv = iStyled.div`
  display: flex;
  align-items: flex-end;
`;

const GatsbyIcon = iStyled.img`
  margin-left: 5px;
  width: 1.1rem;
  height: 1.1rem;
`;

// ------------------------
//    Main Component
// ------------------------

export const Footer = () => {
  return (
    <Wrapper>
      <FlexDiv>
        <span>Created with</span>
        <a href="https://www.gatsbyjs.com/" target="_blank" rel="noopener">
          <GatsbyIcon src="/Gatsby-Monogram.svg" />
        </a>
      </FlexDiv>
      <span>Copyright &copy; Jon Ganebski {new Date().getFullYear()}</span>{" "}
    </Wrapper>
  );
};
