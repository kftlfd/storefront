import React from "react";

import { PageContainer, PageMainText } from "../../layout/page";

export default class ErrorPage extends React.Component {
  componentDidMount() {
    window.scroll(0, 0);
    document.title = "Cart";
  }

  render() {
    return (
      <PageContainer>
        <PageMainText>Page not found</PageMainText>
      </PageContainer>
    );
  }
}
