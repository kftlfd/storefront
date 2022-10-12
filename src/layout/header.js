import styled from "styled-components";

export const hide = {
  visibility: "hidden",
  opacity: 0,
  transition: "all 0.2s ease",
  "&.show": {
    visibility: "visible",
    opacity: 1,
  },
};

export const MainHeader = styled.header({
  height: (props) => props.theme.size.headerHeight,
  paddingInline: (props) => props.theme.size.pageInlinePadding,
  position: "sticky",
  top: 0,
  zIndex: 50,
  backgroundColor: (props) => props.theme.color.bg,
  boxShadow: (props) => (props.shadow ? props.theme.shadow.darker : "none"),
  transition: (props) => props.theme.transition.default,
  display: "flex",
  gap: "0.5rem",
});

export const MainNav = styled.nav({
  flexGrow: 1,
  paddingBlock: (props) => props.theme.size.headerBtnSpacing,
  display: "flex",
  gap: (props) => props.theme.size.headerBtnSpacing,
  overflowX: "auto",

  "@media (max-width: 799px)": {
    display: "none",
  },
});

export const HeaderButtons = styled.div({
  display: "flex",
  gap: (props) => props.theme.size.headerBtnSpacing,
  alignItems: "center",
});

export const HeaderButtonContainer = styled.div({
  position: "relative",
  zIndex: (props) => props.zIndex || "auto",
  height: (props) =>
    `calc(${props.theme.size.headerHeight} - (${props.theme.size.headerBtnSpacing} * 2))`,
  aspectRatio: "1/1",
});

export const HeaderButton = styled.button({
  height: "100%",
  width: "100%",
  padding: 0,
  display: "grid",
  placeContent: "center",

  color: (props) => props.theme.color.text,
  backgroundColor: (props) => props.theme.color.bg,
  border: "none",
  borderRadius: (props) => props.theme.size.borderRadius,

  fontFamily: "inherit",
  fontSize: "1rem",
  fontWeight: "normal",

  cursor: "pointer",
  transition: (props) => props.theme.transition.default,

  "&.active": {
    backgroundColor: (props) => props.theme.color.bgButton,
  },

  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
});

export const HeaderButtonBackdrop = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "100vh",
  zIndex: (props) => props.zIndex || "auto",
  ...hide,
});
