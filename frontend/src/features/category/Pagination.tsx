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

    return (
      <PaginationContainer>
        {hasPrev && (
          <PaginationBtn onClick={() => onSelect(page - 1)}>
            <Chevron style={{ rotate: '90deg' }} />
          </PaginationBtn>
        )}

        <PaginationBtn onClick={() => onSelect(page)}>{page}</PaginationBtn>

        {hasNext && (
          <PaginationBtn onClick={() => onSelect(page + 1)}>
            <Chevron style={{ rotate: '-90deg' }} />
          </PaginationBtn>
        )}
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
`;

const Chevron = styled(ChevronIcon)`
  height: 1rem;
  fill: ${({ theme }) => theme.color.text};
  transition: ${({ theme }) => theme.transition.default};
`;
