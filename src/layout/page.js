import styled from "styled-components";

export const PageWrapper = styled.div({
  backgroundColor: (props) => props.theme.color.bg,
  color: (props) => props.theme.color.text,
  transition: (props) => props.theme.transition.default,
  minHeight: "100vh",
});

export const PageContainer = styled.div({
  paddingBlock: "4rem",
  paddingInline: "1rem",
  maxWidth: "1200px",
  margin: "auto",
});

export const PageMainText = styled.div({
  fontFamily: "Raleway",
  fontSize: "30px",
  fontWeight: "400",
  textAlign: "center",
});
