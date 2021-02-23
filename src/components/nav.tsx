import Link from "next/link";
import React from "react";
import { NAV_HEIGHT } from "../common/constants";
import { styled } from "../styles/theme";

// ------------------------
//    Styled Components
// ------------------------

const Wrapper = styled.nav`
  position: fixed;
  top: 0px;
  z-index: 10;
  height: ${NAV_HEIGHT};
  width: 100%;
  background-color: ${({ theme }) => theme.bgColor.background};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const Ul = styled.ul`
  margin: 0 auto;
  height: 100%;
  width: full;
  max-width: 1000px;
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor.shade};
`;

// ------------------------
//    Main Component
// ------------------------

export const Nav = () => {
  return (
    <Wrapper>
      <Ul>
        <li>
          <StyledLink href="/">
            <a>Blog</a>
          </StyledLink>
        </li>
        <li>
          <StyledLink href="/projects">
            <a>Projects</a>
          </StyledLink>
        </li>
        <li>
          <StyledLink href="/gallery">
            <a>Gallery</a>
          </StyledLink>
        </li>
      </Ul>
    </Wrapper>
  );
};
