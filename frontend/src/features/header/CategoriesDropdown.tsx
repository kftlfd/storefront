import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Dropdown from '@/components/Dropdown';
import { links } from '@/routing/Router';
import { capitalizeFirst } from '@/utils/capitalize';

interface Props {
  categories: string[];
}

interface State {
  open: boolean;
}

class CategoriesDropdown extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggleDropdown = () => {
    this.setState((prev) => ({ open: !prev.open }));
  };

  render(): ReactNode {
    return (
      <CategoriesDropdownWrapper>
        <Dropdown
          isOpen={this.state.open}
          onClose={() => this.setState({ open: false })}
          target={
            <CategoriesDropdownBtn
              className={this.state.open ? 'active' : ''}
              onClick={this.toggleDropdown}
            >
              <div className="line" />
              <div className="line" />
              <div className="line" />
            </CategoriesDropdownBtn>
          }
          position="bottom-left"
        >
          {this.props.categories.map((id) => (
            <CategoriesDropdownMenuBtn key={id} to={links.category(id)}>
              {capitalizeFirst(id)}
            </CategoriesDropdownMenuBtn>
          ))}
        </Dropdown>
      </CategoriesDropdownWrapper>
    );
  }
}

export default CategoriesDropdown;

const CategoriesDropdownWrapper = styled.div`
  margin-block: ${(props) => props.theme.size.headerBtnSpacing};
  flex: 1;
  display: none;

  @media (max-width: 799px) {
    display: flex;
  }
`;

const CategoriesDropdownBtn = styled.button`
  height: 3rem;
  width: 3rem;
  padding: 1rem 0.6rem;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${({ theme }) => theme.color.bg};
  border-radius: ${({ theme }) => theme.size.borderRadius};
  transition: ${({ theme }) => theme.transition.default};
  cursor: pointer;

  &.active {
    background-color: ${({ theme }) => theme.color.bgButton};
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.bgHover};
  }

  & .line {
    height: 2px;
    background-color: ${({ theme }) => theme.color.text};
    border-radius: ${({ theme }) => theme.size.borderRadius};
  }
`;

const CategoriesDropdownMenuBtn = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-radius: 0;
  text-align: left;
  text-decoration: none;
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  transition: ${({ theme }) => theme.transition.default};
  cursor: pointer;

  &.active {
    font-weight: 600;
    color: ${({ theme }) => theme.color.accent};
    background-color: ${({ theme }) => theme.color.bgButton};
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.bgHover};
  }
`;
