import React from "react";

import Cart from "../../components/Cart";

export default class CartPage extends React.Component {
  componentDidMount() {
    window.scroll(0, 0);
    document.title = "Cart";
  }

  render() {
    return (
      <div className="PageWrapper">
        <Cart />
      </div>
    );
  }
}
