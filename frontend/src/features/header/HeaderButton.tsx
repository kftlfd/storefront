import styled, { css } from 'styled-components';

export const HeaderButtonContainer = styled.div<{ zIndex?: number }>(
  ({ theme, zIndex }) => css`
    position: relative;
    z-index: ${zIndex ?? 'auto'};
    height: calc(${theme.size.headerHeight} - (${theme.size.headerBtnSpacing} * 2));
    aspect-ratio: 1/1;
  `,
);

export const HeaderButton = styled.button(
  ({ theme }) => css`
    height: 100%;
    width: 100%;
    padding: 0;
    display: grid;
    place-content: center;

    color: ${theme.color.text};
    background-color: ${theme.color.bg};
    border: none;
    border-radius: ${theme.size.borderRadius};

    font-family: inherit;
    font-size: 1rem;
    font-weight: normal;

    cursor: pointer;
    transition: ${theme.transition.default};

    &.active {
      background-color: ${theme.color.bgButton};
    }

    &:hover {
      background-color: ${theme.color.bgHover};
    }
  `,
);
