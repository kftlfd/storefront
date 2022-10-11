import React from "react";

import Cart from "../Cart";

import cartIcon from "../../assets/cart.svg";
import {
  HeaderButtonContainer,
  HeaderButton,
  HeaderButtonBackdrop,
} from "../../layout/header";
import {
  IconContainer,
  CartIcon,
  Badge,
  MiniCartMenu,
  BackdropTop,
  BackdropBottom,
} from "./MiniCart.ui";

export class MiniCart extends React.Component {
  toggleMiniCart = () => this.props.toggleMiniCart();

  closeMiniCart = () => this.props.toggleMiniCart(false);

  getCartCount = () =>
    this.props.cart.reduce((prev, x) => (prev += x.quantity), 0);

  render() {
    const cartCount = this.getCartCount();

    return (
      <>
        <HeaderButtonContainer zIndex={61}>
          <HeaderButton
            onClick={this.toggleMiniCart}
            className={this.props.miniCartOpen ? "active" : ""}
          >
            <IconContainer>
              <CartIcon src={cartIcon} alt={"Mini Cart"} />
              {cartCount > 0 && <Badge className="show">{cartCount}</Badge>}
            </IconContainer>
          </HeaderButton>

          <MiniCartMenu className={this.props.miniCartOpen ? "show" : ""}>
            {this.props.cart.length > 0 ? (
              <Cart mini={"true"} />
            ) : (
              <EmptyCart>Cart is empty</EmptyCart>
            )}
          </MiniCartMenu>
        </HeaderButtonContainer>

        <HeaderButtonBackdrop
          zIndex={60}
          className={this.props.miniCartOpen ? "show" : ""}
          onClick={this.closeMiniCart}
        >
          <BackdropTop />
          <BackdropBottom />
        </HeaderButtonBackdrop>
      </>
    );
  }
}
