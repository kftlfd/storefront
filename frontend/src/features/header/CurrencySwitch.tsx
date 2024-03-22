import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import Dropdown, { DropdownMenuItem } from '@/components/Dropdown';
import { StoreState } from '@/store';
import { selectCurrency } from '@/store/settings';

import { HeaderButton, HeaderButtonContainer } from './HeaderButton';

const withStore = connect(
  (state: StoreState) => ({
    currency: state.settings.selectedCurrency,
    currencyList: state.settings.currencies,
  }),
  {
    selectCurrency,
  },
);

type StoreProps = ConnectedProps<typeof withStore>;

interface State {
  menuOpen: boolean;
}

export class CurrencySwitch extends Component<StoreProps, State> {
  constructor(props: StoreProps) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  toggleMenu = () => this.setState((prev) => ({ menuOpen: !prev.menuOpen }));

  render() {
    const currency = this.props.currencyList.find((x) => x.label === this.props.currency);

    return (
      <Dropdown
        isOpen={this.state.menuOpen}
        onClose={() => this.setState({ menuOpen: false })}
        target={
          <HeaderButtonContainer>
            <HeaderButton onClick={this.toggleMenu} className={this.state.menuOpen ? 'active' : ''}>
              <CurrencyButton>{currency?.symbol}</CurrencyButton>
            </HeaderButton>
          </HeaderButtonContainer>
        }
      >
        {this.props.currencyList.map(({ label, symbol }) => (
          <DropdownMenuItem key={label} onClick={() => this.props.selectCurrency(label)}>
            {symbol} {label}
          </DropdownMenuItem>
        ))}
      </Dropdown>
    );
  }
}

export default withStore(CurrencySwitch);

const CurrencyButton = styled.div`
  display: flex;
  gap: 0.5rem;
`;
