import React from "react";

import chevronIcon from "../../assets/chevron.svg";
import {
  HeaderButtonContainer,
  HeaderButton,
  HeaderButtonBackdrop,
} from "../../layout/header";
import {
  CurrencyButton,
  Chevron,
  CurrencyMenu,
  CurrencyMenuButton,
} from "./CurrencySwith.ui";

export class CurrencySwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
    this.toggleMenu = () => this._toggleMenu();
    this.closeMenu = () => this._toggleMenu(false);
  }

  _toggleMenu(val) {
    if (val) {
      this.setState({ menuOpen: val });
    } else {
      this.setState((prev) => ({ menuOpen: !prev.menuOpen }));
    }
  }

  render() {
    const currency = this.props.currencyList.find(
      (x) => x.label === this.props.currency
    );

    return (
      <>
        <HeaderButtonContainer zIndex={71}>
          <HeaderButton onClick={this.toggleMenu}>
            <CurrencyButton>
              {currency.symbol}
              <Chevron
                src={chevronIcon}
                className={this.state.menuOpen ? "open" : ""}
              />
            </CurrencyButton>
          </HeaderButton>

          <CurrencyMenu className={this.state.menuOpen ? "show" : ""}>
            {this.props.currencyList.map((item) => (
              <CurrencyMenuButton
                key={item.label}
                onClick={() => {
                  this.props.selectCurrency(item.label);
                  this.setState({ menuOpen: false });
                }}
              >
                <span>{item.symbol}</span>
                <span>{item.label}</span>
              </CurrencyMenuButton>
            ))}
          </CurrencyMenu>
        </HeaderButtonContainer>

        <HeaderButtonBackdrop
          zIndex={70}
          className={this.state.menuOpen ? "show" : ""}
          onClick={this.closeMenu}
        />
      </>
    );
  }
}
