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

export const HeaderButtonContainer = styled.div({
  display: "flex",
  alignItems: "stretch",
  position: "relative",
  zIndex: (props) => props.zIndex || "auto",
});

export const HeaderButton = styled.button({
  paddingBlock: 0,
  paddingInline: "1rem",
  border: "none",
  backgroundColor: "inherit",
  fontFamily: "inherit",
  fontSize: "1rem",
  fontWeight: "normal",
  textAlign: "left",
  cursor: "pointer",
  display: "grid",
  placeContent: "center",
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
