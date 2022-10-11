import styled from "styled-components";

export const PageWrapper = styled.div({
  minHeight: "100vh",
  backgroundColor: (props) => props.theme.color.bg,
  color: (props) => props.theme.color.text,
  transition: (props) => props.theme.transition.default,
});

export const PageContainer = styled.main({
  paddingInline: (props) => props.theme.size.pageInlinePadding,
});

export const PageMainText = styled.div({
  marginTop: "5rem",
  fontSize: "32px",
  textAlign: "center",
});
