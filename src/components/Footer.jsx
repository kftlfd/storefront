import React from "react";
import styled from "styled-components";

export default class Footer extends React.Component {
  render() {
    return (
      <FooterWrapper>
        <FooterContent>
          <a href={"mailto:kftlfd@ex.ua"}>kftlfd@ex.ua</a>
          &bull;
          <a href={"https://github.com/kftlfd/"}>GitHub</a>
        </FooterContent>
      </FooterWrapper>
    );
  }
}

const FooterWrapper = styled.footer({
  paddingInline: (props) => props.theme.size.pageInlinePadding,
});

const FooterContent = styled.div({
  paddingBlock: "1rem",
  display: "flex",
  justifyContent: "center",
  alighItems: "center",
  flexWrap: "wrap",
  gap: "0.5rem",
  color: (props) => props.theme.color.text,
  borderTop: (props) => `1px solid ${props.theme.color.bgHover}`,
  transition: (props) => props.theme.transition.default,

  "& a": {
    color: "inherit",
    textDecoration: "none",
  },
  "& a:hover": {
    textDecoration: "underline",
  },
});
