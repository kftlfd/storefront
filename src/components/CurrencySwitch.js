import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { selectCurrency } from "../store/currency";

import chevronIcon from "../assets/chevron.svg";
import {
  hide,
  HeaderButtonContainer,
  HeaderButton,
  HeaderButtonBackdrop,
} from "../layout/header";

const mapStateToProps = (state) => ({
  currency: state.currency.selected,
  currencyList: state.currency.list,
});

const mapDispatchToProps = (dispatch) => ({
  selectCurrency: (payload) => dispatch(selectCurrency(payload)),
});

class CurrencySwitch extends React.Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitch);

const CurrencyButton = styled.div({
  display: "flex",
  gap: "0.5rem",
});

const Chevron = styled.img({
  width: "0.5rem",
  aspectRatio: "1/1",
  transition: (props) => props.theme.transition.default,
  "&.open": {
    transform: "rotate(-180deg)",
  },
  filter: (props) => props.theme.img.filter,
});

const CurrencyMenu = styled.div({
  position: "absolute",
  top: "100%",
  right: 0,
  borderRadius: (props) => props.theme.size.borderRadius,
  backgroundColor: (props) => props.theme.color.bg,
  boxShadow: (props) => props.theme.shadow.lighter,
  paddingBlock: "0.5rem",
  ...hide,
});

const CurrencyMenuButton = styled.div({
  paddingInline: "1rem",
  paddingBlock: "0.5rem",
  display: "flex",
  gap: "0.5rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
});
