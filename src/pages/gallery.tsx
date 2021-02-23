import { useEffect, useRef, useState } from "react";
import { GalleryItem } from "../components/gallery-item";
import { Layout } from "../components/layout";
import { styled } from "../styles/theme";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import { GetStaticProps, NextPage } from "next";
import { IGalleryFrontmatter } from "../interfaces/frontmatters.interfaces";
import { IGetGalleryOutput } from "../interfaces/get-gallery.interfaces";

// ------------------------
//    Styled Components
// ------------------------

const Main = styled.main`
  position: relative;
  max-width: 1200px;
  width: 100%;
`;

const Slider = styled.ul`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const ExploreBtnCore = styled.div`
  position: absolute;
  width: 3rem;
  height: 50%;
  font-size: 2rem;
  top: 50%;
  cursor: pointer;
  &:hover {
    svg {
      fill: ${({ theme }) => theme.textColor.linkHover};
    }
  }
  display: none;
  @media only screen and (min-width: 700px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const ExploreLeft = styled(ExploreBtnCore)`
  left: 0;
  transform: translateY(-50%);
`;
const ExploreRight = styled(ExploreBtnCore)`
  right: 0;
  transform: translateY(-50%);
`;

const Navigator = styled.nav`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  gap: 2px;
`;

const DotContainer = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

interface IDotProps {
  isLocation: boolean;
}

const Dot = styled.span<IDotProps>`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: ${({ isLocation, theme }) =>
    isLocation ? theme.textColor.linkHover : theme.textColor.shade};
`;

// ------------------------
//    Main Component
// ------------------------

const GalleryPage: NextPage<IGetGalleryOutput> = ({ gallery }) => {
  const sliderRef = useRef<HTMLUListElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.querySelectorAll("p").forEach((p) => {
        p.onclick = (e) => e.stopPropagation();
      });
    }
  }, [sliderRef.current]);

  const isNotFirstPhoto = 0 < currentIndex;

  const isNotLastPhoto = currentIndex < gallery.length - 1;

  const scrollTo = (targetIndex: number) => {
    if (sliderRef.current) {
      if (isNotFirstPhoto || isNotLastPhoto) {
        sliderRef.current.scroll({
          behavior: "smooth",
          left: sliderRef.current.clientWidth * targetIndex,
        });
      }
    }
  };

  const onScroll = () => {
    if (sliderRef.current) {
      const index = Math.round(
        sliderRef.current.scrollLeft / sliderRef.current.clientWidth
      );
      setCurrentIndex(index);
    }
  };

  return (
    <Layout pageTitle="Gallery">
      <Main>
        <Slider ref={sliderRef} onScroll={onScroll}>
          {gallery.map((data, index) => {
            return <GalleryItem {...data} key={index} />;
          })}
          {isNotFirstPhoto && (
            <ExploreLeft onClick={() => scrollTo(currentIndex - 1)}>
              <MdKeyboardArrowLeft />
            </ExploreLeft>
          )}
          {isNotLastPhoto && (
            <ExploreRight onClick={() => scrollTo(currentIndex + 1)}>
              <MdKeyboardArrowRight />
            </ExploreRight>
          )}
        </Slider>
        <Navigator role="list">
          {gallery.map((data, index) => {
            return (
              <DotContainer onClick={() => scrollTo(index)} key={index}>
                <Dot isLocation={index === currentIndex} />
              </DotContainer>
            );
          })}
        </Navigator>
      </Main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<IGetGalleryOutput> = async () => {
  const files = fs.readdirSync("src/posts/gallery");
  const gallery = files.map((fileName) => {
    const metadata = fs
      .readFileSync(path.join("src", "posts", "gallery", fileName))
      .toString();
    const result = matter(metadata);
    const frontmatter = result.data as IGalleryFrontmatter;
    return { ...frontmatter };
  });
  return {
    props: {
      gallery,
    },
  };
};

export default GalleryPage;
