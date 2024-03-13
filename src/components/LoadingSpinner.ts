import styled, { css, keyframes } from 'styled-components';

const spinnerAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const LoadingSpinner = styled.div<{ size?: number }>(
  ({ theme, size = 40 }) => css`
    height: ${size}px;
    width: ${size}px;
    border: ${size / 10}px solid ${theme.color.accent};
    border-radius: 50%;
    border-right-color: transparent;
    animation: ${spinnerAnimation} 1.5s linear infinite;
    margin: auto;
  `,
);
