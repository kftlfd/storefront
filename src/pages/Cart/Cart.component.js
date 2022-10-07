import React from "react";

import { PageContainer } from "../../layout/page";
import Cart from "../../components/Cart";

export default class CartPage extends React.Component {
  componentDidMount() {
    window.scroll(0, 0);
    document.title = "Cart";
  }

  render() {
    return (
      <PageContainer>
        <Cart />
      </PageContainer>
    );
  }
}
