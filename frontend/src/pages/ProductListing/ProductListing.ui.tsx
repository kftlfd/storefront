import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { hideable } from '@/layout/hideable';

const AppRoot = document.querySelector('#root');

const CategoryHeader = styled.div`
  padding-block: 3rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const CategoryTitle = styled.h1`
  margin: 0;
  font-size: 42px;
  font-weight: 400;
`;

const CategorySorting = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
`;

const SortingLabel = styled.div`
  align-self: center;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div<{ zIndex?: number }>(
  ({ theme, zIndex }) => css`
    position: absolute;
    top: 0;
    right: 0;
    padding-block: 0.5rem;
    border-radius: ${theme.size.borderRadius};
    background-color: ${theme.color.bg};
    box-shadow: ${theme.shadow.lighter};
    transition: ${theme.transition.default};
    z-index: ${zIndex ?? 110};
    ${hideable}
  `,
);

const DropdownMenuButton = styled.div`
  padding-inline: 1rem;
  padding-block: 0.5rem;
  white-space: nowrap;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.default};

  &.selected {
    background-color: ${({ theme }) => theme.color.bgButton};
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.bgHover};
  }
`;

class DropdownMenuBackdrop extends React.Component<{
  show?: boolean;
  onClick?: () => void;
  zIndex?: number;
}> {
  render() {
    if (!this.props.show || !AppRoot) return;

    return ReactDOM.createPortal(
      <Backdrop className={'show'} onClick={this.props.onClick} zIndex={this.props.zIndex} />,
      AppRoot,
    );
  }
}

const Backdrop = styled.div<{ zIndex?: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${({ zIndex }) => zIndex ?? 100};
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  display: grid;
  place-content: center;
  cursor: pointer;
  border: none;
  font-family: inherit;
  font-size: 1rem;
  font-weight: normal;
  border-radius: ${(props) => props.theme.size.borderRadius};
  color: ${(props) => props.theme.color.text};
  background-color: ${(props) => props.theme.color.bgButton};
  transition: ${(props) => props.theme.transition.default};

  &:hover {
    background-color: ${(props) => props.theme.color.bgHover};
  }
`;

const ButtonIcon = styled.img<{ up?: boolean }>`
  filter: ${({ theme }) => theme.img.filter};
  height: 1rem;
  rotate: ${({ up }) => (up ? '-180deg' : 'none')};
  transition: ${({ theme }) => theme.transition.default};
`;

const ListingsGrid = styled.div`
  padding-bottom: 4rem;
  display: grid;
  justify-content: center;
  align-items: start;
  column-gap: 40px;
  row-gap: 60px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Pagination = styled.div`
  padding-bottom: 4rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const PaginationBtn = styled(Link)`
  padding: 0;
  height: 2rem;
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.color.bgButton};
  border-radius: ${({ theme }) => theme.size.borderRadius};
  border: none;
  display: grid;
  place-content: center;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.default};

  &:hover {
    background-color: ${(props) => props.theme.color.bgHover};
  }
`;

const PageArrow = styled.img<{ right?: boolean }>`
  height: 1rem;
  filter: ${({ theme }) => theme.img.filter};
  rotate: ${({ right }) => (right ? '-90deg' : '90deg')};
`;

export {
  CategoryHeader,
  CategoryTitle,
  CategorySorting,
  SortingLabel,
  DropdownContainer,
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuBackdrop,
  Button,
  ButtonIcon,
  ListingsGrid,
  Pagination,
  PaginationBtn,
  PageArrow,
};
