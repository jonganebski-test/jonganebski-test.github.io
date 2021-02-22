import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { IMyTheme } from "./theme";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    *{
      box-sizing:border-box;
      transition: background-color 0.5s ease-in-out;
      color: ${({ theme }) => theme.textColor.base};
    }
    a{
      text-decoration:none;
      color: ${({ theme }: { theme: IMyTheme }) => theme.textColor.base};
      &:hover{
        color: ${({ theme }) => theme.textColor.linkHover}
      }
    }
    ::selection {
      color: rgb(250, 250, 250);
      background-color: #805AD5;
    }
  `;
