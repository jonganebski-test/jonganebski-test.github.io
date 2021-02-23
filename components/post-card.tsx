import React from "react";
import { iStyled } from "../styles/theme";
import { formatDate } from "../common/helpers";
import Link from "next/link";

// ------------------------
//    Interfaces
// ------------------------

interface IFrontMatter {
  title: string;
  date: string;
  coverUrl: string;
}

interface IPost {
  slug: string;
  excerpt: string;
  frontMatter: IFrontMatter;
}

interface IBlogPostProps {
  post: IPost;
}

// ------------------------
//    Styled Components
// ------------------------

const Post = iStyled.li`
  min-height: 10rem;
  display: grid;
  grid-template-columns: 1fr 0px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.borderColor.base};
  transition: border-color 0.15s ease-in-out;
  color: ${({ theme }) => theme.textColor.base};
  font-family: "Nanum Gothic", sans-serif;
  &:hover {
    border-color: ${({ theme }) => theme.borderColor.hover};
  }
  @media only screen and (min-width: 700px) {
    grid-template-columns: 3fr 1fr;
  }
`;

const PostTitle = iStyled.h2`
  font-size: 1.2rem;
  line-height: 2rem;
  font-weight: 600;
  word-break: keep-all;
`;

const Excerpt = iStyled.p`
  margin: 1rem 0;
  font-size: 0.9rem;
  line-height: 1.5rem;
`;

const PostInfo = iStyled.div`
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostDate = iStyled.span`
  font-size: 0.9rem;
  font-weight: 300;
`;

const TimeToRead = iStyled.span`
  font-size: 0.9rem;
  font-weight: 300;
`;

const CoverImage = iStyled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

// -----------------------
//    Main Component
// -----------------------

export const PostCard: React.FC<IBlogPostProps> = ({ post }) => {
  return (
    <Link href={`blog/${post.slug}`}>
      <a>
        <Post>
          <PostInfo>
            <PostTitle>{post.frontMatter.title}</PostTitle>
            <Excerpt>{post.excerpt}</Excerpt>
            <div>
              <PostDate>{formatDate(post.frontMatter.date)} • </PostDate>
              {/* <TimeToRead>{post.timeToRead} min read</TimeToRead> */}
            </div>
          </PostInfo>
          {post.frontMatter.coverUrl && (
            <div>
              <CoverImage src={post.frontMatter.coverUrl} />
            </div>
          )}
        </Post>
      </a>
    </Link>
  );
};
