import { css } from '@emotion/react';

export const IframeStyle = css`
  iframe {
    width: 50%;
    height: 300px;

    @media (max-width: 425px) {
      width: 100%;
      height: 210px;
    }
  }
`;
