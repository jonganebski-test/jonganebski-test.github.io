import React from "react";
import { styled } from "../styles/theme";
import Image from "next/image";

// ------------------------
//    Styled Components
// ------------------------

const Wrapper = styled.footer`
  margin-top: auto;
  padding: 5rem 0 1rem 0;
  height: 10rem;
  width: 100%;
  max-width: 1000px;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.textColor.rare};
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Anchor = styled.a`
  margin-left: 5px;
  display: flex;
  align-items: flex-end;
`;

const NextjsLogo = styled.img`
  width: 40px;
  filter: ${({ theme }) => theme.svg.filter};
`;

// ------------------------
//    Main Component
// ------------------------

export const Footer = () => {
  return (
    <Wrapper>
      <FlexDiv>
        <span>Created with</span>
        <Anchor href="https://nextjs.org/" target="_blank" rel="noopener">
          <NextjsLogo src="/Nextjs-logo.svg" />
        </Anchor>
      </FlexDiv>
      <span>Copyright &copy; Jon Ganebski {new Date().getFullYear()}</span>{" "}
    </Wrapper>
  );
};
