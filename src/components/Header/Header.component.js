import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import "./Header.scss";

import { links } from "../Router";
import brandLogo from "../../assets/brand.svg";
import { ThemeSwitch } from "./ThemeSwitch";
import { CurrencySwitch } from "./CurrencySwitch";
import { MiniCart } from "./MiniCart";

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shadow: window.scrollY > 0 };
  }

  watchScroll = () => this.setState({ shadow: window.scrollY > 0 });

  componentDidMount() {
    window.addEventListener("scroll", this.watchScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.watchScroll);
  }

  render() {
    return (
      <StyledHeader shadow={this.state.shadow}>
        <Wrapper>
          <LogoBtn to={"/"}>
            <img className="BrandLogo" src={brandLogo} alt={"Brand Logo"} />
          </LogoBtn>

          <div className="NavBtns">
            {this.props.categories.map((id, index) => (
              <NavBtn
                key={index}
                to={links.category(id)}
                className={id === this.props.activeCategory ? "active" : ""}
              >
                {id}
              </NavBtn>
            ))}
          </div>

          <div className="HeaderBtns">
            <ThemeSwitch />
            <CurrencySwitch
              currency={this.props.currency}
              currencyList={this.props.currencyList}
              selectCurrency={this.props.selectCurrency}
            />
            <MiniCart
              cart={this.props.cart}
              miniCartOpen={this.props.miniCartOpen}
              toggleMiniCart={this.props.toggleMiniCart}
            />
          </div>
        </Wrapper>
      </StyledHeader>
    );
  }
}

const StyledHeader = styled.header({
  position: "sticky",
  top: 0,
  zIndex: 50,
  paddingInline: "1rem",
  backgroundColor: (props) => props.theme.color.bg,
  transition: (props) => props.theme.transition.default,
  boxShadow: (props) => (props.shadow ? props.theme.shadow.darker : "none"),
});

const Wrapper = styled.nav({
  maxWidth: "1200px",
  margin: "auto",
  display: "flex",
  height: (props) => props.theme.size.headerHeight,
});

const NavBtn = styled(NavLink)({
  display: "flex",
  alignItems: "center",
  paddingInline: "1rem",
  color: (props) => props.theme.color.text,
  fontSize: "16px",
  fontWeight: 400,
  textTransform: "uppercase",
  textDecoration: "none",
  cursor: "pointer",
  transition: (props) => props.theme.transition.default,
  position: "relative",
  marginBlock: "6px",
  borderRadius: "3px",

  "&::after": {
    display: "block",
    content: "''",
    height: "2px",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "-6px",
    backgroundColor: "transparent",
    transition: (props) => props.theme.transition.default,
  },

  "&.active": {
    color: (props) => props.theme.color.accent,
    fontWeight: 600,
    "&::after": {
      backgroundColor: (props) => props.theme.color.accent,
    },
  },

  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
});

const LogoBtn = styled(NavLink)({
  borderRadius: "3px",
  marginBlock: "3px",
  marginRight: "6px",
  aspectRatio: "1/1",
  display: "grid",
  placeContent: "center",
  cursor: "pointer",
  transition: (props) => props.theme.transition.default,

  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
});
