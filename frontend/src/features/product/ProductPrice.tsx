import { Component } from 'react';
import styled from 'styled-components';

import { Currency, Price } from '@/api/types';
import { formatPrice } from '@/utils/price';

interface Props {
  currency: Currency | null;
  prices: Price[];
}

class ProductPrice extends Component<Props> {
  render() {
    const { currency, prices } = this.props;

    const price = formatPrice(prices, currency);

    return <ProductInfoPrice>{price}</ProductInfoPrice>;
  }
}

export default ProductPrice;

const ProductInfoPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;
