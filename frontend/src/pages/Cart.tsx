import { Component } from 'react';

import Cart from '@/features/cart/Cart';
import { PageContainer } from '@/layout/page';

class CartPage extends Component {
  componentDidMount() {
    window.scroll(0, 0);
    document.title = 'Cart';
  }

  render() {
    return (
      <PageContainer>
        <Cart />
      </PageContainer>
    );
  }
}

export default CartPage;
