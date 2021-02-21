import { ServerStyleSheet } from "styled-components";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enchanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch (err) {
      console.log(err);
    } finally {
      sheet.seal();
    }
  }
  //   render() {
  //     return (
  //       <Html lang="en">
  //         <Head />
  //         <body>
  //           <Main />
  //           <NextScript />
  //         </body>
  //       </Html>
  //     );
  //   }
}
