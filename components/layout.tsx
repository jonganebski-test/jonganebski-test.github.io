import React, { ReactNode, useEffect, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import { NAV_HEIGHT, ROUTES_WITH_FIXED_HEADER } from "../common/constants";
import { GlobalStyle } from "../styles/global";
import { darkTheme, lightTheme, iStyled } from "../styles/theme";
import { Footer } from "./footer";
import { Header } from "./header";
import { Nav } from "./nav";
import { useRouter } from "next/router";
import Head from "next/head";

// ------------------------
//    Interfaces & Types
// ------------------------

interface IContainerProps {
  pathname: string;
}

interface ISwitchProps {
  colorMode: ColorMode;
}

interface ILayoutProps {
  children: ReactNode;
  pageTitle: string;
}

type ColorMode = "light" | "dark";

// ------------------------
//    Styled Components
// ------------------------

const Wrapper = iStyled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Container = iStyled.div<IContainerProps>`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin-top: ${({ pathname }) => {
    if (ROUTES_WITH_FIXED_HEADER.includes(pathname)) {
      return `calc(100vh - ${NAV_HEIGHT})`;
    } else {
      return NAV_HEIGHT;
    }
  }};
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.bgColor.background};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArrowDown = iStyled.button`
  all: unset;
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
  background-color: white;
  color: black;
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`;

const Switch = iStyled.label<ISwitchProps>`
  position: absolute;
  z-index: 1;
  top: calc(${NAV_HEIGHT} + 1rem);
  right: calc(${NAV_HEIGHT} / 2);
  width: 2.5rem;
  height: 1.3rem;
  cursor: pointer;
  border-radius: 1rem;
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderColor.switch};
  fill-opacity: 0.5;
  input {
    opacity: 0;
    height: 0;
    width: 0;
  }
  span {
    position: absolute;
    display: block;
    top: 50%;
    left: ${({ colorMode }) => (colorMode === "light" ? "10%" : "90%")};
    transition: left 0.2s ease-in-out;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.bgColor.switch};
    border-radius: 999px;
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media only screen and (min-width: 700px) {
    position: fixed;
    top: 2rem;
    z-index: 10;
  }
`;

// ------------------------
//    Main Component
// ------------------------

export const Layout: React.FC<ILayoutProps> = ({ children, pageTitle }) => {
  const router = useRouter();
  const [colorMode, setColorMode] = useState<ColorMode | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getInitialTheme = (): ColorMode => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
      }

      return "light";
    };
    setColorMode(getInitialTheme());
  });

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset < 500) {
        if (headerRef.current) {
          headerRef.current.style.opacity = 1 - window.pageYOffset / 500 + "";
        }
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  const autoScroll = () => {
    if (containerRef.current) {
      window.scroll({
        top: containerRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const onToggleDarkModeSwitch = () =>
    setColorMode((prev) => {
      if (prev === "light") {
        localStorage.setItem("theme", "dark");
        return "dark";
      }
      localStorage.setItem("theme", "light");
      return "light";
    });

  return colorMode ? (
    <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Head>
        <title>{pageTitle} | Test</title>
      </Head>
      <Wrapper className="wrapper" data-theme={colorMode}>
        <Nav />
        {ROUTES_WITH_FIXED_HEADER.includes(router.pathname) && (
          <Header headerRef={headerRef} />
        )}
        <Container ref={containerRef} pathname={router.pathname}>
          {ROUTES_WITH_FIXED_HEADER.includes(router.pathname) && (
            <ArrowDown onClick={autoScroll}>&darr;</ArrowDown>
          )}
          {children}
          <Footer />
        </Container>
        <Switch colorMode={colorMode}>
          <input
            type="checkbox"
            defaultChecked={colorMode === "dark"}
            onChange={onToggleDarkModeSwitch}
          />
          <span>{colorMode === "light" ? "🌜" : "🌞"}</span>
        </Switch>
      </Wrapper>
    </ThemeProvider>
  ) : null;
};
