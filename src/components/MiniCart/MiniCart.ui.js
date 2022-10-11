import styled from "styled-components";
import { hide } from "../../layout/header";

const IconContainer = styled.div({
  position: "relative",
});

const CartIcon = styled.img({
  height: "1rem",
  display: "block",
  filter: (props) => props.theme.img.filter,
});

const Badge = styled.div({
  position: "absolute",
  top: "-50%",
  left: "50%",
  height: "1rem",
  minWidth: "1rem",
  borderRadius: "1rem",
  backgroundColor: (props) => props.theme.color.text,
  color: (props) => props.theme.color.bg,

  paddingInline: "0.2rem",
  fontFamily: "Arial, sans-serif",
  fontSize: "0.6rem",
  fontWeight: 600,
  display: "grid",
  placeContent: "center",

  ...hide,
});

const MiniCartMenu = styled.div({
  paddingInline: "1rem",
  paddingBottom: "2rem",
  position: "absolute",
  top: (props) => `calc(100% + ${props.theme.size.headerBtnSpacing} + 0.5rem)`,
  borderRadius: (props) => props.theme.size.borderRadius,
  right: 0,
  width: "325px",
  maxHeight: (props) => `calc(100vh - ${props.theme.size.headerHeight} - 1rem)`,
  display: "flex",
  flexDirection: "column",
  overflowY: "hidden",
  backgroundColor: (props) => props.theme.color.bg,
  ...hide,
});

const EmptyCart = styled.div({
  paddingTop: "2rem",
  textAlign: "center",
});

const BackdropTop = styled.div({
  height: (props) => props.theme.size.headerHeight,
});

const BackdropBottom = styled.div({
  height: (props) => `calc(100vh - ${props.theme.size.headerHeight})`,
  backgroundColor: (props) => props.theme.color.backdrop,
});

export {
  IconContainer,
  CartIcon,
  Badge,
  MiniCartMenu,
  EmptyCart,
  BackdropTop,
  BackdropBottom,
};
