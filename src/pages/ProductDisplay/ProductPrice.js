import React from "react";

import { formatPrice } from "../../utils/price";

export class ProductPrice extends React.Component {
  render() {
    const { currency, prices } = this.props;

    const price = formatPrice(prices, currency);

    return <div className="price">{price}</div>;
  }
}
