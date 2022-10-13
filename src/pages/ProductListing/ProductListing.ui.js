import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { hide } from "../../layout/header";

const AppRoot = document.querySelector("#root");

const CategoryHeader = styled.div({
  paddingBlock: "3rem",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
});

const CategoryTitle = styled.h1({
  margin: 0,
  fontSize: "42px",
  fontWeight: 400,
});

const CategorySorting = styled.div({
  display: "flex",
  alignItems: "stretch",
  gap: "0.5rem",
});

const SortingLabel = styled.div({ alignSelf: "center" });

const DropdownContainer = styled.div({
  position: "relative",
});

const DropdownMenu = styled.div({
  position: "absolute",
  top: 0,
  right: 0,
  paddingBlock: "0.5rem",
  borderRadius: (props) => props.theme.size.borderRadius,
  backgroundColor: (props) => props.theme.color.bg,
  boxShadow: (props) => props.theme.shadow.lighter,
  transition: (props) => props.theme.transition.default,
  zIndex: (props) => props.zIndex ?? 110,
  ...hide,
});

const DropdownMenuButton = styled.div({
  paddingInline: "1rem",
  paddingBlock: "0.5rem",
  whiteSpace: "nowrap",
  cursor: "pointer",
  transition: (props) => props.theme.transition.default,
  "&.selected": {
    backgroundColor: (props) => props.theme.color.bgButton,
  },
  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
});

class DropdownMenuBackdrop extends React.Component {
  render() {
    if (!this.props.show) return;

    return ReactDOM.createPortal(
      <Backdrop
        className={"show"}
        onClick={this.props.onClick}
        zIndex={this.props.zIndex || null}
      />,
      AppRoot
    );
  }
}

const Backdrop = styled.div({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: (props) => props.zIndex ?? 100,
});

const Button = styled.button({
  padding: "0.5rem 1rem",
  display: "grid",
  placeContent: "center",
  cursor: "pointer",
  border: "none",
  fontFamily: "inherit",
  fontSize: "1rem",
  fontWeight: "normal",
  borderRadius: (props) => props.theme.size.borderRadius,
  color: (props) => props.theme.color.text,
  backgroundColor: (props) => props.theme.color.bgButton,
  transition: (props) => props.theme.transition.default,
  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
});

const ButtonIcon = styled.img({
  filter: (props) => props.theme.img.filter,
  height: "1rem",
  rotate: (props) => (props.up ? "-180deg" : "none"),
  transition: (props) => props.theme.transition.default,
});

const ListingsGrid = styled.div({
  paddingBottom: "4rem",
  display: "grid",
  justifyContent: "center",
  alignItems: "start",
  columnGap: "40px",
  rowGap: "60px",

  "@media (min-width: 600px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  "@media (min-width: 800px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },

  "@media (min-width: 1000px)": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
});

export {
  CategoryHeader,
  CategoryTitle,
  CategorySorting,
  SortingLabel,
  DropdownContainer,
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuBackdrop,
  Button,
  ButtonIcon,
  ListingsGrid,
};
