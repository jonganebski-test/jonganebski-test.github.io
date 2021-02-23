import React from "react";
import { styled } from "../styles/theme";
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import Link from "next/link";
import {
  IGetBlogPost_prevBlogPost,
  IGetBlogPost_nextBlogPost,
} from "../interfaces/get-blog-post.interfaces";

// ------------------------
//    Interfaces
// ------------------------

interface IBlogNavProps {
  prevPost: IGetBlogPost_prevBlogPost;
  nextPost: IGetBlogPost_nextBlogPost;
}

// ------------------------
//    Styled Components
// ------------------------

const NavItem = styled.div`
  cursor: pointer;
  span {
    font-size: 0.9rem;
    font-weight: 300;
  }
  h5 {
    font-family: "Nanum Gothic", sans-serif;
    line-height: 1.5rem;
    word-break: keep-all;
    margin: 1rem 0;
  }
`;

const NodeDivCore = styled.div`
  height: 100%;
  display: grid;
  grid-auto-flow: column;
  place-items: center;
  gap: 1rem;
  svg {
    font-size: 2rem;
  }
  &:hover {
    svg {
      fill: #da3633;
    }
  }
`;
const Nav = styled.nav`
  min-height: 5rem;
  margin: 7rem 0;
  display: grid;
  grid-template: "prev next" 1fr / 1fr 1fr;
  gap: 1rem;
`;

const PrevNode = styled(NodeDivCore)`
  text-align: start;
`;
const NextNode = styled(NodeDivCore)`
  text-align: end;
`;

const PrevLink = styled(Link)`
  grid-area: prev;
`;
const NextLink = styled(Link)`
  grid-area: next;
`;

// ------------------------
//    Main Component
// ------------------------

export const BlogNav: React.FC<IBlogNavProps> = ({ prevPost, nextPost }) => {
  return (
    <Nav>
      {prevPost ? (
        <PrevLink href={`/blog/${prevPost.slug}`}>
          <a>
            <PrevNode>
              <TiArrowLeftOutline />
              <NavItem>
                <span>Previous Post</span>
                <h5>{prevPost.frontmatter.title}</h5>
                {/* <span>{prevPost.timeToRead} min read</span> */}
              </NavItem>
            </PrevNode>
          </a>
        </PrevLink>
      ) : (
        <div />
      )}
      {nextPost ? (
        <NextLink href={`/blog/${nextPost.slug}`}>
          <a>
            <NextNode>
              <NavItem>
                <span>Next Post</span>
                <h5>{nextPost.frontmatter.title}</h5>
                {/* <span>{nextPost.timeToRead} min read</span> */}
              </NavItem>
              <TiArrowRightOutline />
            </NextNode>
          </a>
        </NextLink>
      ) : (
        <div />
      )}
    </Nav>
  );
};
