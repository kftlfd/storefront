import styled from "styled-components";
import { hide } from "../../layout/header";

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
  top: 0, // "100%",
  right: 0,
  paddingBlock: "0.5rem",
  borderRadius: (props) => props.theme.size.borderRadius,
  backgroundColor: (props) => props.theme.color.bg,
  boxShadow: (props) => props.theme.shadow.lighter,
  transition: (props) => props.theme.transition.default,
  ...hide,
});

const CurrencyMenuButton = styled.div({
  paddingInline: "1rem",
  paddingBlock: "0.5rem",
  cursor: "pointer",
  transition: (props) => props.theme.transition.default,

  display: "grid",
  gridTemplateColumns: "1rem auto",
  gap: "0.5rem",
  "& span:nth-child(2n + 1)": {
    justifySelf: "center",
  },
  "& span:nth-child(2n)": {
    justifySelf: "start",
  },

  "&.selected": {
    backgroundColor: (props) => props.theme.color.bgButton,
  },
  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
});

export { CurrencyButton, Chevron, CurrencyMenu, CurrencyMenuButton };
