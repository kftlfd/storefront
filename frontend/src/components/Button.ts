import styled, { css } from 'styled-components';

export const Button = styled.button<{
  $big?: boolean;
  $biggerFont?: boolean;
}>(
  ({ theme, $big, $biggerFont }) => css`
    flex: 1 1 0;
    width: ${$big ? '280px' : 'auto'};
    height: ${$big ? '45px' : 'auto'};
    display: grid;
    place-content: center;
    padding: 13px;
    border: 1px solid ${theme.color.text};
    border-radius: ${theme.size.borderRadius};
    font-family: inherit;
    font-size: ${$biggerFont ? '16px' : '14px'};
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    color: ${theme.color.text};
    transition: ${theme.transition.default};
    background-color: ${theme.color.bg};

    &:hover {
      background-color: ${theme.color.bgHover};
    }
  `,
);

export const AccentButton = styled(Button)(
  ({ theme }) => css`
    border-color: transparent;
    color: white;
    background-color: ${theme.color.accent};

    &:hover {
      background-color: ${theme.color.accentHover};
    }
  `,
);
