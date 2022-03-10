import { Global, css } from "@emotion/react";
import React from "react";

const GlobalStyles: React.FC = () => {
  return (
    <Global
      styles={css`
        html,
        body,
        #root {
          height: 100%;
          box-sizing: border-box;
        }
      `}
    />
  );
};

export default GlobalStyles;
