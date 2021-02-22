import styled, { ThemedBaseStyledInterface } from "styled-components";

const defaultTheme = {
  white: "#fafafa",
  dark: "#293241",
  red: "red",
};

export type ThemeType = typeof defaultTheme;

// export const iStyled = styled as ThemedBaseStyledInterface<ThemeType>;

export default defaultTheme;
