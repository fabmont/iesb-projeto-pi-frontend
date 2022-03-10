import { Global, css } from '@emotion/react';
import React from 'react';

const GlobalStyles: React.FC = () => {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }

        html,
        body,
        #root {
          min-height: 100% !important;
          height: 100%;
        }
      `}
    />
  );
};

export default GlobalStyles;
