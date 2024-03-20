import { Component, ReactNode } from 'react';
import styled from 'styled-components';

import ChevronIcon from '@/assets/chevron.svg?react';

class Pagination extends Component<{
  page: number;
  total: number;
  onSelect: (selectedPage: number) => void;
}> {
  render(): ReactNode {
    const { page, total, onSelect } = this.props;
    const hasPrev = page > 1;
    const hasNext = page < total;

    const pages = (() => {
      const start = Math.max(page - 2, 1);
      const end = Math.min(page + 2, total);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    })();

    return (
      <PaginationContainer>
        <PaginationBtn disabled={!hasPrev} onClick={() => onSelect(page - 1)}>
          <Chevron style={{ rotate: '90deg' }} />
        </PaginationBtn>

        {pages.map((p) => (
          <PaginationBtn key={p} className={p === page ? 'active' : ''} onClick={() => onSelect(p)}>
            {p}
          </PaginationBtn>
        ))}

        <PaginationBtn disabled={!hasNext} onClick={() => onSelect(page + 1)}>
          <Chevron style={{ rotate: '-90deg' }} />
        </PaginationBtn>
      </PaginationContainer>
    );
  }
}

export default Pagination;

const PaginationContainer = styled.div`
  padding-bottom: 4rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const PaginationBtn = styled.button`
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

  &.active {
    background-color: ${({ theme }) => theme.color.accent};
    color: white;

    &:hover {
      background-color: ${({ theme }) => theme.color.accentHover};
    }
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Chevron = styled(ChevronIcon)`
  height: 1rem;
  fill: ${({ theme }) => theme.color.text};
  transition: ${({ theme }) => theme.transition.default};
`;
