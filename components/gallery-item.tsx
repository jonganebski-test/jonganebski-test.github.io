import React, { useEffect, useRef, useState } from "react";
import { iStyled } from "../styles/theme";
import { VscClose } from "react-icons/vsc";

// ------------------------
//    Interfaces
// ------------------------

interface IStateProvider {
  showText: boolean;
}

// ------------------------
//    Styled Components
// ------------------------

const ListItem = iStyled.li`
  flex-shrink: 0;
  width: 100%;
  max-width: 1200px;
  scroll-snap-align: start;
  position: relative;
  padding: 4rem 1rem 2rem 1rem;
  @media only screen and (min-width: 700px) {
    padding: 4rem 5rem 2rem 5rem;
  }
`;

const Container = iStyled.div`
  position: relative;
  cursor: pointer;
`;

const CloseButton = iStyled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  border-radius: 100%;
  svg {
    fill: #c9d1d9;
  }
  &:hover {
    svg {
      fill: #da3633;
    }
  }
`;

const Photograph = iStyled.img<IStateProvider>`
  width: 100%;
  max-width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  backface-visibility: hidden;
  object-fit: cover;
  transition: filter 0.3s linear;
  filter: ${({ showText }) => (showText ? "blur(2px)" : "blur(0px)")};
`;

const Article = iStyled.article<IStateProvider>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  line-height: 2rem;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ showText }) => (showText ? 1 : 0)};
  cursor: ${({ showText }) => (showText ? "default" : "pointer")};
  text-align: center;
  * {
    color: #c9d1d9;
  }
`;

// ------------------------
//    Main Component
// ------------------------

interface IGalleryData {
  title: string;
  date: string;
  coverUrl: string;
}

export const GalleryItem: React.FC<IGalleryData> = ({
  title,
  date,
  coverUrl,
}) => {
  const [showText, setShowText] = useState(false);

  return (
    <ListItem>
      <Container>
        <Photograph src={coverUrl} showText={showText} />
        <Article onClick={() => setShowText(true)} showText={showText}>
          <h3>{date}</h3>
          <h1>{title}</h1>
        </Article>
        {showText && (
          <CloseButton role="button" onClick={() => setShowText(false)}>
            <VscClose />
          </CloseButton>
        )}
      </Container>
    </ListItem>
  );
};
