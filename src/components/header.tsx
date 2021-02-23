import React from "react";
import { keyframes } from "styled-components";
import { EMAIL } from "../common/constants";
import { styled } from "../styles/theme";

// ------------------------
//    Interfaces
// ------------------------

interface IHeaderProps {
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
}

// ------------------------
//    Styled Components
// ------------------------

const Wrapper = styled.header`
  position: fixed;
  height: calc(100vh - 5rem);
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor.background};
`;

const Intro = styled.div`
  max-width: 1000px;
  width: 100%;
  height: 30%;
  line-height: 4rem;
  font-size: 1.4rem;
  font-family: "Nanum Gothic", sans-serif;
  @media only screen and (min-width: 400px) {
    font-size: 1.6rem;
  }
  @media only screen and (min-width: 500px) {
    font-size: 2rem;
  }
`;

const waveHand = keyframes`
  0%{
    transform: rotate(0deg)
  }
  5%{
    transform: rotate(30deg)
  }
  10%{
    transform: rotate(0deg)
  }
`;

const HiEmoji = styled.span`
  display: inline-block;
  animation: ${waveHand} 10s linear infinite;
`;

const Anchor = styled.a`
  color: ${({ theme }) => theme.textColor.rare};
  text-underline-offset: 0.5rem;
  &:hover {
    text-decoration: underline;
  }
`;

// ------------------------
//    Main Component
// ------------------------

export const Header: React.FC<IHeaderProps> = ({ headerRef }) => {
  return (
    <Wrapper>
      <Intro ref={headerRef}>
        <h2>
          안녕하세요! <HiEmoji>👋</HiEmoji>
        </h2>
        <h2>웹 개발자 방진석입니다.</h2>
        <span>💌 </span>
        <Anchor href={`mailto: ${EMAIL}`}>{EMAIL}</Anchor>
      </Intro>
    </Wrapper>
  );
};
