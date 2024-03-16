import { Component } from 'react';

import { Price } from '@/api/types';

import { formatPrice } from '../../utils/price';

interface Props {
  currency: string;
  prices: Price[];
}

class ProductPrice extends Component<Props> {
  render() {
    const { currency, prices } = this.props;

    const price = formatPrice(prices, currency);

    return <div className="price">{price}</div>;
  }
}

export default ProductPrice;
