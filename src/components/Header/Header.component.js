import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { MainHeader, MainNav, HeaderButtons } from "../../layout/header";
import { links } from "../Router";
import brandLogo from "../../assets/brand.png";

import ThemeSwitch from "../ThemeSwitch";
import CurrencySwitch from "../CurrencySwitch";
import MiniCart from "../MiniCart";

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shadow: window.scrollY > 0,
      dropdownOpen: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.updateShadow);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateShadow);
  }

  updateShadow = () => {
    this.setState({ shadow: window.scrollY > 0 });
  };

  toggleDropdown = () => {
    this.setState((prev) => ({ dropdownOpen: !prev.dropdownOpen }));
  };

  getCategoryLinks = (El) =>
    this.props.categories.map((id) => (
      <El
        key={id}
        to={links.category(id)}
        className={id === this.props.activeCategory ? "active" : ""}
      >
        {id[0].toUpperCase() + id.slice(1)}
      </El>
    ));

  render() {
    return (
      <MainHeader shadow={this.state.shadow}>
        <BrandLink to={"/"}>
          <BrandLogo src={brandLogo} alt={"Brand Logo"} />
        </BrandLink>

        <CategoriesDropdown>
          <CategoriesDropdownBtn
            className={this.state.dropdownOpen ? "active" : ""}
            onClick={this.toggleDropdown}
          >
            <div className="line" />
            <div className="line" />
            <div className="line" />
          </CategoriesDropdownBtn>
          <CategoriesDropdownMenu
            className={this.state.dropdownOpen ? "show" : ""}
            onClick={this.toggleDropdown}
          >
            {this.getCategoryLinks(CategoriesDropdownMenuBtn)}
          </CategoriesDropdownMenu>
        </CategoriesDropdown>
        <CategoriesDropdownBackdrop
          show={this.state.dropdownOpen}
          onClick={this.toggleDropdown}
        />

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

const CategoriesDropdown = styled.div({
  position: "relative",
  marginBlock: (props) => props.theme.size.headerBtnSpacing,
  flexGrow: 1,
  flexShrink: 0,
  display: "none",

  "@media (max-width: 799px)": {
    display: "flex",
  },
});

const CategoriesDropdownBtn = styled.button({
  zIndex: 71,
  aspectRatio: "1",
  padding: "1rem 0.6rem",
  border: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  fontFamily: "inherit",
  fontSize: "1rem",
  fontWeight: 600,
  backgroundColor: (props) => props.theme.color.bg,
  borderRadius: (props) => props.theme.size.borderRadius,
  color: (props) => props.theme.color.accent,
  transition: (props) => props.theme.transition.default,
  cursor: "pointer",

  "&.active": {
    backgroundColor: (props) => props.theme.color.bgButton,
  },

  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },

  "& .line": {
    height: "2px",
    backgroundColor: (props) => props.theme.color.text,
    borderRadius: (props) => props.theme.size.borderRadius,
  },
});

const CategoriesDropdownMenu = styled.div({
  zIndex: 71,
  paddingBlock: "0.5rem",
  position: "absolute",
  top: "100%",
  left: 0,
  display: "flex",
  flexDirection: "column",
  backgroundColor: (props) => props.theme.color.bg,
  borderRadius: (props) => props.theme.size.borderRadius,
  boxShadow: (props) => props.theme.shadow.lighter,
  transition: (props) => props.theme.transition.default,
  visibility: "hidden",
  opacity: 0,

  "&.show": {
    visibility: "visible",
    opacity: 1,
  },
});

const CategoriesDropdownMenuBtn = styled(Link)({
  display: "block",
  padding: "0.5rem 1rem",
  background: "none",
  border: "none",
  borderRadius: 0,
  textAlign: "left",
  textDecoration: "none",
  backgroundColor: (props) => props.theme.color.bg,
  color: (props) => props.theme.color.text,
  transition: (props) => props.theme.transition.default,
  cursor: "pointer",

  "&.active": {
    fontWeight: 600,
    color: (props) => props.theme.color.accent,
    backgroundColor: (props) => props.theme.color.bgButton,
  },

  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
});

const CategoriesDropdownBackdrop = styled.div({
  zIndex: 70,
  display: (props) => (props.show ? "block" : "none"),
  position: "absolute",
  inset: "0 0 auto",
  height: "100vh",
});

const BrandLink = styled(Link)({
  flexShrink: 0,
  marginBlock: (props) => props.theme.size.headerBtnSpacing,
  borderRadius: (props) => props.theme.size.borderRadius,
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
  flexShrink: 0,
  position: "relative",
  paddingInline: "1rem",
  display: "grid",
  placeContent: "center",

  color: (props) => props.theme.color.text,
  backgroundColor: (props) => props.theme.color.bg,
  border: "none",
  borderRadius: (props) => props.theme.size.borderRadius,

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
