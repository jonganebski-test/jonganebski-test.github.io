import BaseStyled, { ThemedStyledInterface } from "styled-components";

// ------------------------
//    Interfaces
// ------------------------

export interface IMyTheme {
  bgColor: {
    background: string;
    pre: string;
    code: string;
    switch: string;
    alter: string;
  };
  textColor: {
    rare: string;
    base: string;
    shade: string;
    linkHover: string;
  };
  borderColor: {
    base: string;
    hover: string;
    switch: string;
  };
  svg: {
    filter: string;
  };
}

// ------------------------
//    Constants
// ------------------------

const BACKGROUND_COLOR = {
  LIGHT: "white",
  DARK: "#0d1117",
};

// ------------------------
//    Themes
// ------------------------

export const lightTheme: IMyTheme = {
  bgColor: {
    background: BACKGROUND_COLOR.LIGHT,
    pre: "rgb(235, 235, 235)",
    code: "rgb(235, 235, 235)",
    switch: "#da3633",
    alter: BACKGROUND_COLOR.DARK,
  },
  textColor: {
    rare: "black",
    base: "rgb(30, 30, 30)",
    shade: "rgb(200, 200, 200)",
    linkHover: "#1f6feb",
    // linkHover: "#0366d6",
  },
  borderColor: {
    base: "rgb(220, 220, 220)",
    hover: "rgb(150, 150, 150)",
    switch: "#ffa198",
  },
  svg: {
    filter: "invert(0%)",
  },
};

export const darkTheme: IMyTheme = {
  bgColor: {
    background: BACKGROUND_COLOR.DARK,
    pre: "rgb(22 27 34)",
    code: "#23241f",
    switch: BACKGROUND_COLOR.DARK,
    alter: BACKGROUND_COLOR.DARK,
  },
  textColor: {
    rare: "white",
    base: "#c9d1d9",
    shade: "rgb(80, 80, 80)",
    linkHover: "#388bfd",
    // linkHover: "#58a6ff",
  },
  borderColor: {
    base: "rgb(50, 50, 50)",
    hover: "rgb(150, 150, 150)",
    switch: "#8b949e",
  },
  svg: {
    filter: "Invert(100%)",
  },
};

// ---------------------------
//    Extended Base Styled
// ---------------------------

export const styled = BaseStyled as ThemedStyledInterface<IMyTheme>;
