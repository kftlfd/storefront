import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { links } from '@/routing/Router';
import { StoreState } from '@/store';
import { decreaseQuantity, increaseQuantity, toggleMiniCart, updateItem } from '@/store/cart';
import { formatTotal } from '@/utils/price';

import { AccentButton, Button } from '../../components/Button';
import CartContent from './CartContent';
import CartItem from './CartItem';

const withStore = connect(
  (state: StoreState) => ({
    currency: state.settings.selectedCurrency,
    cart: state.cart.items,
    products: state.products.products,
  }),
  {
    updateItem,
    increaseQuantity,
    decreaseQuantity,
    toggleMiniCart,
  },
);

type StoreProps = ConnectedProps<typeof withStore>;

interface Props extends StoreProps, RouteComponentProps {
  mini?: boolean;
}

class Cart extends Component<Props> {
  openCartPage = () => {
    this.props.toggleMiniCart(false);
    this.props.history.push(links.cart);
  };

  openCheckOut = () => {
    this.props.toggleMiniCart(false);
    this.props.history.push(links.checkout);
  };

  closeCart = () => this.props.toggleMiniCart(false);

  render() {
    const { cart, currency, products, mini, updateItem, decreaseQuantity, increaseQuantity } =
      this.props;

    if (cart.length < 1) {
      return <EmptyCart>Cart is empty</EmptyCart>;
    }

    const cartTotal = cart.reduce(
      (acc, item) => {
        const price = products[item.id]?.prices.find((p) => p.currency.label === currency?.label);
        acc.quantity += item.quantity;
        acc.amount += (price?.amount ?? 0) * item.quantity;
        return acc;
      },
      { quantity: 0, amount: 0 },
    );

    return (
      <>
        {mini ? (
          <MiniCartInfo.Container>
            <MiniCartInfo.HeaderText>My cart, </MiniCartInfo.HeaderText>
            <MiniCartInfo.HeaderCount>
              {cartTotal.quantity} item{cartTotal.quantity > 1 && 's'}
            </MiniCartInfo.HeaderCount>
          </MiniCartInfo.Container>
        ) : (
          <FullCartTitle>Cart</FullCartTitle>
        )}

        <CartContent mini={mini}>
          {cart.map((item, index) => (
            <CartItem
              key={item.id + index}
              item={item}
              onUpdate={(item) => updateItem({ index, item })}
              increaseQuantity={() => increaseQuantity(index)}
              decreaseQuantity={() => decreaseQuantity(index)}
              closeCart={this.closeCart}
              mini={this.props.mini}
            />
          ))}
        </CartContent>

        {this.props.mini ? (
          <MiniCartInfo.Container>
            <MiniCartInfo.Total>
              <MiniCartInfo.TotalText>Total:</MiniCartInfo.TotalText>
              <MiniCartInfo.TotalAmount>
                {formatTotal(cartTotal.amount, currency)}
              </MiniCartInfo.TotalAmount>
            </MiniCartInfo.Total>
          </MiniCartInfo.Container>
        ) : (
          <FullCartTotal>
            <TextNormal>Quantity:</TextNormal>
            <TextBold>{cartTotal.quantity}</TextBold>

            <TextSemibold>Total:</TextSemibold>
            <TextBold>{formatTotal(cartTotal.amount, currency)}</TextBold>

            <TextNormal>Tax 21%:</TextNormal>
            <TextBold>{formatTotal(cartTotal.amount * 0.21, currency)}</TextBold>
          </FullCartTotal>
        )}

        {this.props.mini ? (
          <MiniCartButtons>
            <Button onClick={this.openCartPage}>View cart</Button>
            <AccentButton onClick={this.openCheckOut}>Checkout</AccentButton>
          </MiniCartButtons>
        ) : (
          <FullCartButtons>
            <AccentButton $big onClick={this.openCheckOut}>
              Checkout
            </AccentButton>
          </FullCartButtons>
        )}
      </>
    );
  }
}

export default withRouter(withStore(Cart));

const EmptyCart = styled.div`
  text-align: center;
  font-size: 1.5rem;
  padding-block: 3rem;
`;

const MiniCartInfo = {
  Container: styled.div`
    font-size: 16px;
    padding-inline: 1rem;
  `,
  HeaderText: styled.span`
    font-weight: 700;
  `,
  HeaderCount: styled.span`
    font-weight: 500;
  `,
  Total: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  TotalText: styled.div`
    font-weight: 500;
  `,
  TotalAmount: styled.div`
    font-weight: 700;
  `,
};

const FullCartTitle = styled.h1`
  margin: 0;
  padding-block: 3rem;
  font-size: 42px;
  font-weight: 400;
`;

const FullCartTotal = styled.div`
  padding-block: 2rem;
  display: grid;
  grid-template-columns: max-content auto;
  column-gap: 1rem;
  row-gap: 0.5rem;
  font-size: 1.2rem;
`;

const TextNormal = styled.div`
  font-weight: 400;
`;
const TextSemibold = styled.div`
  font-weight: 500;
`;
const TextBold = styled.div`
  font-weight: 700;
`;

const MiniCartButtons = styled.div`
  padding-inline: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const FullCartButtons = styled.div`
  margin-bottom: 3rem;
`;
