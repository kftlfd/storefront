import styled, { css } from 'styled-components';

import { hideable } from './hideable';

export const MainHeader = styled.header<{ shadow?: boolean }>(
  ({ theme, shadow }) => css`
    height: ${theme.size.headerHeight};
    padding-inline: ${theme.size.pageInlinePadding};
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: ${theme.color.bg};
    box-shadow: ${shadow ? theme.shadow.darker : 'none'};
    transition: ${theme.transition.default};
    display: flex;
    gap: 0.5rem;
  `,
);

export const MainNav = styled.nav`
  flex-grow: 1;
  padding-block: ${({ theme }) => theme.size.headerBtnSpacing};
  display: flex;
  gap: ${({ theme }) => theme.size.headerBtnSpacing};
  overflow-x: auto;

  @media (max-width: 799px) {
    display: none;
  }
`;

export const HeaderButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.size.headerBtnSpacing};
  align-items: center;
`;

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

export const HeaderButtonBackdrop = styled.div<{ zIndex?: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  z-index: ${({ zIndex }) => zIndex ?? 'auto'};
  ${hideable}
`;
