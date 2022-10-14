import React from "react";

import "./Cart.scss";

import { links } from "../Router";
import { formatTotal } from "../../utils/price";
import { Button, AccentButton } from "../Button";
import { CartContent } from "./CartContent";
import { CartItem } from "./CartItem";

export class Cart extends React.Component {
  render() {
    if (this.props.cart.length < 1) {
      return <div className="EmptyCart">Cart is empty</div>;
    }

    const currencyObj = this.props.currencyList.find(
      (x) => x.label === this.props.currencyLabel
    );

    const cartTotal = this.props.cart.reduce(
      (acc, item) => {
        const price = this.props.products[item.id].prices.find(
          (p) => p.currency.label === currencyObj.label
        );
        acc.quantity += item.quantity;
        acc.amount += price.amount * item.quantity;
        return acc;
      },
      { quantity: 0, amount: 0 }
    );

    const openCartPage = () => {
      this.props.toggleMiniCart();
      this.props.navigate(links.cart);
    };

    const openCheckOut = () => {
      this.props.toggleMiniCart(false);
      this.props.history.push(links.checkout);
    };

    const closeCart = () => this.props.toggleMiniCart(false);

    return (
      <>
        {this.props.mini ? (
          <div className="MiniCartInfo">
            <span className="header-text">My cart, </span>
            <span className="header-count">
              {cartTotal.quantity} item{cartTotal.quantity > 1 && "s"}
            </span>
          </div>
        ) : (
          <h1 className="FullCartTitle">Cart</h1>
        )}

        <CartContent mini={this.props.mini}>
          {this.props.cart.map((item, index) => (
            <CartItem
              key={item.id + index}
              mini={this.props.mini}
              item={item}
              product={this.props.products[item.id]}
              currency={currencyObj.label}
              increaseQuantity={() => this.props.increaseQuantity(index)}
              decreaseQuantity={() => this.props.decreaseQuantity(index)}
              closeCart={closeCart}
            />
          ))}
        </CartContent>

        {this.props.mini ? (
          <div className="MiniCartInfo">
            <div className="total">
              <div className="text">Total:</div>
              <div className="amount">
                {formatTotal(cartTotal.amount, currencyObj)}
              </div>
            </div>
          </div>
        ) : (
          <div className="FullCartTotal">
            <div className="normal">Quantity:</div>
            <div className="bold">{cartTotal.quantity}</div>

            <div className="semibold">Total:</div>
            <div className="bold">
              {formatTotal(cartTotal.amount, currencyObj)}
            </div>

            <div className="normal">Tax 21%:</div>
            <div className="bold">
              {formatTotal(cartTotal.amount * 0.21, currencyObj)}
            </div>
          </div>
        )}

        {this.props.mini ? (
          <div className="MiniCartButtons">
            <Button onClick={openCartPage}>View cart</Button>
            <AccentButton onClick={openCheckOut}>Checkout</AccentButton>
          </div>
        ) : (
          <div className="FullCartButtons">
            <AccentButton big={true} onClick={openCheckOut}>
              Checkout
            </AccentButton>
          </div>
        )}
      </>
    );
  }
}
