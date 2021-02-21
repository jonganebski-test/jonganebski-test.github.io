import React from "react";
import Head from "next/head";

interface ILayoutProps {
  pageTitle: string;
}

export const Layout: React.FC<ILayoutProps> = ({ pageTitle, children }) => {
  return (
    <>
      <Head>
        <title>{pageTitle} | Jon Ganebski test page</title>
      </Head>
      <div>
        <main>{children}</main>
      </div>
    </>
  );
};
