import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { MainHeader, MainNav, HeaderButtons } from "../../layout/header";
import { links } from "../Router";
import brandLogo from "../../assets/brand.svg";

import ThemeSwitch from "../ThemeSwitch";
import CurrencySwitch from "../CurrencySwitch";
import MiniCart from "../MiniCart";

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
      <MainHeader shadow={this.state.shadow}>
        <BrandLink to={"/"}>
          <BrandLogo src={brandLogo} alt={"Brand Logo"} />
        </BrandLink>

        <MainNav>
          {this.props.categories.map((id) => (
            <NavLink
              key={id}
              to={links.category(id)}
              className={id === this.props.activeCategory ? "active" : ""}
            >
              {id[0].toUpperCase() + id.slice(1)}
            </NavLink>
          ))}
        </MainNav>

        <HeaderButtons>
          <ThemeSwitch />
          <CurrencySwitch />
          <MiniCart />
        </HeaderButtons>
      </MainHeader>
    );
  }
}

const BrandLink = styled(Link)({
  borderRadius: (props) => props.theme.size.borderRadius,
  marginBlock: "3px",
  aspectRatio: "1/1",
  display: "grid",
  placeContent: "center",
  cursor: "pointer",
  transition: (props) => props.theme.transition.default,

  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
});

const BrandLogo = styled.img({
  display: "block",
  height: "2rem",
});

const NavLink = styled(Link)({
  position: "relative",
  height: (props) =>
    `calc(${props.theme.size.headerHeight} - (${props.theme.size.headerBtnSpacing} * 2))`,
  paddingInline: "1rem",
  display: "grid",
  placeContent: "center",

  color: (props) => props.theme.color.text,
  backgroundColor: (props) => props.theme.color.bg,
  border: "none",
  borderRadius: (props) => props.theme.size.borderRadius,

  fontSize: "1rem",
  fontWeight: 400,
  textDecoration: "none",

  cursor: "pointer",
  transition: (props) => props.theme.transition.default,

  "&::after": {
    display: "block",
    content: "''",
    height: "2px",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: (props) => `-${props.theme.size.headerBtnSpacing}`,
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
