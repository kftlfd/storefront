import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './Cart.scss';

import { StoreState } from '@/store';
import { decreaseQuantity, increaseQuantity, toggleMiniCart } from '@/store/cart';
import { formatTotal } from '@/utils/price';

import { AccentButton, Button } from './Button';
import CartContent from './CartContent';
import CartItem from './CartItem';
import { links } from './Router';

const withStore = connect(
  (state: StoreState) => ({
    currencyLabel: state.currency.selected,
    currencyList: state.currency.list,
    cart: state.cart.items,
    products: state.products.items,
  }),
  {
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
    this.props.toggleMiniCart();
    this.props.history.push(links.cart);
  };

  openCheckOut = () => {
    this.props.toggleMiniCart(false);
    this.props.history.push(links.checkout);
  };

  closeCart = () => this.props.toggleMiniCart(false);

  render() {
    if (this.props.cart.length < 1) {
      return <div className="EmptyCart">Cart is empty</div>;
    }

    const currencyObj = this.props.currencyList.find((x) => x.label === this.props.currencyLabel);

    const cartTotal = this.props.cart.reduce(
      (acc, item) => {
        const price = this.props.products[item.id]?.prices.find(
          (p) => p.currency.label === currencyObj?.label,
        );
        acc.quantity += item.quantity;
        acc.amount += (price?.amount ?? 0) * item.quantity;
        return acc;
      },
      { quantity: 0, amount: 0 },
    );

    return (
      <>
        {this.props.mini ? (
          <div className="MiniCartInfo">
            <span className="header-text">My cart, </span>
            <span className="header-count">
              {cartTotal.quantity} item{cartTotal.quantity > 1 && 's'}
            </span>
          </div>
        ) : (
          <h1 className="FullCartTitle">Cart</h1>
        )}

        <CartContent mini={this.props.mini}>
          {this.props.cart.map((item, index) => {
            const product = this.props.products[item.id];
            if (!product) {
              console.warn('No product');
              return null;
            }

            return (
              <CartItem
                key={item.id + index}
                mini={this.props.mini}
                item={item}
                product={product}
                currency={currencyObj?.label ?? ''}
                cartItemIndex={index}
                increaseQuantity={this.props.increaseQuantity}
                decreaseQuantity={this.props.decreaseQuantity}
                closeCart={this.closeCart}
              />
            );
          })}
        </CartContent>

        {this.props.mini ? (
          <div className="MiniCartInfo">
            <div className="total">
              <div className="text">Total:</div>
              <div className="amount">{formatTotal(cartTotal.amount, currencyObj)}</div>
            </div>
          </div>
        ) : (
          <div className="FullCartTotal">
            <div className="normal">Quantity:</div>
            <div className="bold">{cartTotal.quantity}</div>

            <div className="semibold">Total:</div>
            <div className="bold">{formatTotal(cartTotal.amount, currencyObj)}</div>

            <div className="normal">Tax 21%:</div>
            <div className="bold">{formatTotal(cartTotal.amount * 0.21, currencyObj)}</div>
          </div>
        )}

        {this.props.mini ? (
          <div className="MiniCartButtons">
            <Button onClick={this.openCartPage}>View cart</Button>
            <AccentButton onClick={this.openCheckOut}>Checkout</AccentButton>
          </div>
        ) : (
          <div className="FullCartButtons">
            <AccentButton big={true} onClick={this.openCheckOut}>
              Checkout
            </AccentButton>
          </div>
        )}
      </>
    );
  }
}

export default withStore(withRouter(Cart));
