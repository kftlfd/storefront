import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import brandLogo from '@/assets/brand.png';
import { links } from '@/routing/Router';
import { StoreState } from '@/store';
import { capitalizeFirst } from '@/utils/capitalize';

import CategoriesDropdown from './CategoriesDropdown';
import CurrencySwitch from './CurrencySwitch';
import MiniCartBtn from './MiniCartBtn';
import ThemeSwitch from './ThemeSwitch';

const withStore = connect((state: StoreState) => ({
  categories: state.settings.categories,
}));

type StoreProps = ConnectedProps<typeof withStore>;

interface Props extends StoreProps {}

interface State {
  shadow: boolean;
}

class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shadow: window.scrollY > 0,
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

  render() {
    return (
      <MainHeader shadow={this.state.shadow}>
        <BrandLink to={links.root}>
          <BrandLogo src={brandLogo} alt={'Brand Logo'} />
        </BrandLink>

        <CategoriesDropdown categories={this.props.categories} />

        <MainNav>
          {this.props.categories.map((id) => (
            <NavLink key={id} to={links.category(id)}>
              {capitalizeFirst(id)}
            </NavLink>
          ))}
        </MainNav>

        <HeaderButtons>
          <ThemeSwitch />
          <CurrencySwitch />
          <MiniCartBtn />
        </HeaderButtons>
      </MainHeader>
    );
  }
}

export default withStore(Header);

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

const MainHeader = styled.header<{ shadow?: boolean }>(
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

const MainNav = styled.nav`
  flex-grow: 1;
  padding-block: ${({ theme }) => theme.size.headerBtnSpacing};
  display: flex;
  gap: ${({ theme }) => theme.size.headerBtnSpacing};
  overflow-x: auto;

  @media (max-width: 799px) {
    display: none;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.size.headerBtnSpacing};
  align-items: center;
`;
