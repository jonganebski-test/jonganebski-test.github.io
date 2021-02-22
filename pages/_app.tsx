import { AppProps } from "next/app";

interface CustomAppProps extends AppProps {}

const CustomApp: React.FC<CustomAppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default CustomApp;
