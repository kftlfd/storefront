import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled, { css } from 'styled-components';

import { HeaderButton, HeaderButtonBackdrop, HeaderButtonContainer } from '@/layout/header';
import { hideable } from '@/layout/hideable';
import { StoreState } from '@/store';
import { selectCurrency } from '@/store/currency';

const withStore = connect(
  (state: StoreState) => ({
    currency: state.currency.selected,
    currencyList: state.currency.list,
  }),
  {
    selectCurrency,
  },
);

type StoreProps = ConnectedProps<typeof withStore>;

interface Props extends StoreProps {}

interface State {
  menuOpen: boolean;
}

export class CurrencySwitch extends Component<Props, State> {
  toggleMenu: () => void;
  closeMenu: () => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
    this.toggleMenu = () => this._toggleMenu();
    this.closeMenu = () => this._toggleMenu(false);
  }

  _toggleMenu(val?: boolean) {
    if (val !== undefined) {
      this.setState({ menuOpen: val });
    } else {
      this.setState((prev) => ({ menuOpen: !prev.menuOpen }));
    }
  }

  render() {
    const currency = this.props.currencyList.find((x) => x.label === this.props.currency);

    return (
      <>
        <HeaderButtonContainer zIndex={71}>
          <HeaderButton onClick={this.toggleMenu} className={this.state.menuOpen ? 'active' : ''}>
            <CurrencyButton>
              {currency?.symbol}
              {/*
                <Chevron
                  src={chevronIcon}
                  className={this.state.menuOpen ? "open" : ""}
                />
              */}
            </CurrencyButton>
          </HeaderButton>

          <CurrencyMenu className={this.state.menuOpen ? 'show' : ''}>
            {this.props.currencyList.map((item) => (
              <CurrencyMenuButton
                key={item.label}
                onClick={() => {
                  this.props.selectCurrency(item.label);
                  this.setState({ menuOpen: false });
                }}
                className={item.label === currency?.label ? 'selected' : ''}
              >
                <span>{item.symbol}</span>
                <span>{item.label}</span>
              </CurrencyMenuButton>
            ))}
          </CurrencyMenu>
        </HeaderButtonContainer>

        <HeaderButtonBackdrop
          zIndex={70}
          className={this.state.menuOpen ? 'show' : ''}
          onClick={this.closeMenu}
        />
      </>
    );
  }
}

export default withStore(CurrencySwitch);

const CurrencyButton = styled.div`
  display: flex;
  gap: 0.5rem;
`;

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

const CurrencyMenuButton = styled.div`
  padding-inline: 1rem;
  padding-block: 0.5rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.default};

  display: grid;
  grid-template-columns: 1rem auto;
  gap: 0.5rem;

  & span:nth-child(2n + 1) {
    justify-self: center;
  }
  & span:nth-child(2n) {
    justify-self: start;
  }

  &.selected {
    background-color: ${({ theme }) => theme.color.bgButton};
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.bgHover};
  }
`;
