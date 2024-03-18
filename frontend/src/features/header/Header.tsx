import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

import brandLogo from '@/assets/brand.png';
import { HeaderButtons, MainHeader, MainNav } from '@/layout/header';
import { links } from '@/pages/Router';
import { StoreState } from '@/store';

import MiniCart from '../cart/MiniCart';
import CurrencySwitch from './CurrencySwitch';
import ThemeSwitch from './ThemeSwitch';

const withStore = connect((state: StoreState) => ({
  categories: state.category.ids,
}));

type StoreProps = ConnectedProps<typeof withStore>;

interface Props extends StoreProps {}

interface State {
  shadow: boolean;
  dropdownOpen: boolean;
}

class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shadow: window.scrollY > 0,
      dropdownOpen: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateShadow);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateShadow);
  }

  updateShadow = () => {
    this.setState({ shadow: window.scrollY > 0 });
  };

  toggleDropdown = () => {
    this.setState((prev) => ({ dropdownOpen: !prev.dropdownOpen }));
  };

  getCategoryLinks = (El: typeof NavLink) =>
    this.props.categories.map((id) => (
      <El key={id} to={links.category(id)}>
        {id[0]!.toUpperCase() + id.slice(1)}
      </El>
    ));

  render() {
    return (
      <MainHeader shadow={this.state.shadow}>
        <BrandLink to={'/'}>
          <BrandLogo src={brandLogo} alt={'Brand Logo'} />
        </BrandLink>

        <CategoriesDropdown>
          <CategoriesDropdownBtn
            className={this.state.dropdownOpen ? 'active' : ''}
            onClick={this.toggleDropdown}
          >
            <div className="line" />
            <div className="line" />
            <div className="line" />
          </CategoriesDropdownBtn>
          <CategoriesDropdownMenu
            className={this.state.dropdownOpen ? 'show' : ''}
            onClick={this.toggleDropdown}
          >
            {this.getCategoryLinks(CategoriesDropdownMenuBtn)}
          </CategoriesDropdownMenu>
        </CategoriesDropdown>
        <CategoriesDropdownBackdrop $show={this.state.dropdownOpen} onClick={this.toggleDropdown} />

        <MainNav>{this.getCategoryLinks(NavLink)}</MainNav>

        <HeaderButtons>
          <ThemeSwitch />
          <CurrencySwitch />
          <MiniCart />
        </HeaderButtons>
      </MainHeader>
    );
  }
}

export default withStore(Header);

const CategoriesDropdown = styled.div`
  position: relative;
  margin-block: ${(props) => props.theme.size.headerBtnSpacing};
  flex-grow: 1;
  flex-shrink: 0;
  display: none;

  @media (max-width: 799px) {
    display: flex;
  }
`;

const CategoriesDropdownBtn = styled.button`
  z-index: 71;
  aspect-ratio: 1;
  padding: 1rem 0.6rem;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${({ theme }) => theme.color.bg};
  border-radius: ${({ theme }) => theme.size.borderRadius};
  color: ${({ theme }) => theme.color.accent};
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

const CategoriesDropdownMenu = styled.div`
  z-index: 71;
  padding-block: 0.5rem;
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.bg};
  border-radius: ${({ theme }) => theme.size.borderRadius};
  box-shadow: ${({ theme }) => theme.shadow.lighter};
  transition: ${({ theme }) => theme.transition.default};
  visibility: hidden;
  opacity: 0;

  &.show {
    visibility: visible;
    opacity: 1;
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

const CategoriesDropdownBackdrop = styled.div<{ $show?: boolean }>`
  z-index: 70;
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  position: absolute;
  inset: 0 0 auto;
  height: 100vh;
`;

const BrandLink = styled(Link)`
  flex-shrink: 0;
  margin-block: ${({ theme }) => theme.size.headerBtnSpacing};
  border-radius: ${({ theme }) => theme.size.borderRadius};
  aspect-ratio: 1/1;
  display: grid;
  place-content: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.default};

  &:hover {
    background-color: ${({ theme }) => theme.color.bgHover};
  }
`;

const BrandLogo = styled.img`
  height: 2rem;
`;

const NavLink = styled(Link)`
  flex-shrink: 0;
  position: relative;
  padding-inline: 1rem;
  display: grid;
  place-content: center;

  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.bg};
  border: none;
  border-radius: ${({ theme }) => theme.size.borderRadius};

  text-decoration: none;

  cursor: pointer;
  transition: ${({ theme }) => theme.transition.default};

  &::after {
    display: block;
    content: '';
    height: 2px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -${({ theme }) => theme.size.headerBtnSpacing};
    background-color: transparent;
    transition: ${({ theme }) => theme.transition.default};
  }

  &.active {
    color: ${({ theme }) => theme.color.accent};
    font-weight: 600;

    &::after {
      background-color: ${({ theme }) => theme.color.accent};
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.bgHover};
  }
`;
