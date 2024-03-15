import { css } from 'styled-components';

export const hideable = css`
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease;

  &.show {
    visibility: visible;
    opacity: 1;
  }
`;
