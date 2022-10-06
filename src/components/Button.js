import styled from "styled-components";

export const Button = styled.button({
  flex: "1 1 0",
  width: (props) => (props.big ? "280px" : "auto"),
  height: (props) => (props.big ? "45px" : "auto"),
  display: "grid",
  placeContent: "center",
  padding: "13px",
  marginTop: (props) => (props.mt ? "20px" : 0),
  border: (props) => `1px solid ${props.theme.color.text}`,
  borderRadius: 0,
  fontFamily: "Raleway",
  fontSize: (props) => (props.biggerFont ? "16px" : "14px"),
  fontWeight: 600,
  textTransform: "uppercase",
  cursor: "pointer",
  color: (props) => props.theme.color.text,
  transition: (props) => props.theme.transition.default,
  backgroundColor: (props) => props.theme.color.bg,
  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
});

export const AccentButton = styled(Button)({
  border: "none",
  color: (props) => props.theme.color.bg,
  backgroundColor: (props) => props.theme.color.accent,
  "&:hover": {
    backgroundColor: (props) => props.theme.color.accentHover,
  },
});
