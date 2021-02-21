import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./theme";

interface Props {
  theme: ThemeType;
}

const GlobalStyle = createGlobalStyle<Props>`
    *, *:after, *:before {
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
