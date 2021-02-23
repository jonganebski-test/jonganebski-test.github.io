import React from "react";
import { styled } from "../styles/theme";
import Link from "next/link";

interface IPaginatorProps {
  currentPage: number;
  totalPagesCount: number;
}

interface IPageProps {
  isCurrentPage: boolean;
}

const PageList = styled.ul`
  margin-top: 5rem;
  display: grid;
  grid-auto-flow: column;
  place-content: center;
  gap: 1rem;
`;

const Page = styled.li<IPageProps>`
  text-decoration: underline;
  font-weight: ${({ isCurrentPage }) => (isCurrentPage ? "700" : "500")};
`;

export const Paginator: React.FC<IPaginatorProps> = ({
  currentPage,
  totalPagesCount,
}) => {
  return (
    <PageList>
      {Array.from(Array(totalPagesCount).keys(), (key) => key + 1).map(
        (page) => {
          return (
            <Page isCurrentPage={currentPage === page} key={page}>
              <Link href={`/blog/page/${page}`}>
                <a>{page}</a>
              </Link>
            </Page>
          );
        }
      )}
    </PageList>
  );
};
