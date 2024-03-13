import styled, { css } from 'styled-components';

import { hideable } from '@/layout/hideable';

const CurrencyButton = styled.div({
  display: 'flex',
  gap: '0.5rem',
});

const Chevron = styled.img({
  width: '0.5rem',
  aspectRatio: '1/1',
  transition: (props) => props.theme.transition.default,
  '&.open': {
    transform: 'rotate(-180deg)',
  },
  filter: (props) => props.theme.img.filter,
});

const CurrencyMenu = styled.div(
  ({ theme }) => css`
    position: absolute;
    top: 0;
    right: 0;
    padding-block: 0.5rem;
    border-radius: ${theme.size.borderRadius};
    background-color: ${theme.color.bg};
    box-shadow: ${theme.shadow.lighter};
    transition: ${theme.transition.default};
    ${hideable}
  `,
);

const CurrencyMenuButton = styled.div({
  paddingInline: '1rem',
  paddingBlock: '0.5rem',
  cursor: 'pointer',
  transition: (props) => props.theme.transition.default,

  display: 'grid',
  gridTemplateColumns: '1rem auto',
  gap: '0.5rem',
  '& span:nth-child(2n + 1)': {
    justifySelf: 'center',
  },
  '& span:nth-child(2n)': {
    justifySelf: 'start',
  },

  '&.selected': {
    backgroundColor: (props) => props.theme.color.bgButton,
  },
  '&:hover': {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
});

export { CurrencyButton, Chevron, CurrencyMenu, CurrencyMenuButton };
