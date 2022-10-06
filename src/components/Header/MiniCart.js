import React from "react";
import styled from "styled-components";

import cartIcon from "../../assets/cart.svg";
import {
  hide,
  HeaderButtonContainer,
  HeaderButton,
  HeaderButtonBackdrop,
} from "./ui";
import Cart from "../Cart";

export class MiniCart extends React.Component {
  render() {
    const cartCount = this.props.cart.reduce(
      (prev, x) => (prev += x.quantity),
      0
    );

    return (
      <>
        <HeaderButtonContainer zIndex={61}>
          <HeaderButton onClick={() => this.props.toggleMiniCart()}>
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
          onClick={() => this.props.toggleMiniCart(false)}
        >
          <BackdropTop />
          <BackdropBottom />
        </HeaderButtonBackdrop>
      </>
    );
  }
}

const IconContainer = styled.div({
  position: "relative",
});

const CartIcon = styled.img({
  height: "1rem",
  display: "block",
});

const Badge = styled.div({
  position: "absolute",
  top: "-50%",
  left: "50%",
  height: "1rem",
  minWidth: "1rem",
  borderRadius: "1rem",
  backgroundColor: (props) => props.theme.color.text,
  color: (props) => props.theme.color.bg,

  paddingInline: "0.2rem",
  fontFamily: "sans-serif",
  fontSize: "0.6rem",
  fontWeight: 600,
  display: "grid",
  placeContent: "center",

  ...hide,
});

const MiniCartMenu = styled.div({
  paddingInline: "1rem",
  paddingBottom: "2rem",
  position: "absolute",
  top: "100%",
  right: 0,
  width: "325px",
  maxHeight: (props) => `calc(100vh - 1.2*(${props.theme.size.headerHeight}))`,
  display: "flex",
  flexDirection: "column",
  overflowY: "hidden",
  backgroundColor: "#fff",
  ...hide,
});

const EmptyCart = styled.div({
  paddingTop: "2rem",
  textAlign: "center",
});

const BackdropTop = styled.div({
  height: (props) => props.theme.size.headerHeight,
});

const BackdropBottom = styled.div({
  height: (props) => `calc(100vh - ${props.theme.size.headerHeight})`,
  backgroundColor: "hsla(247, 13%, 25%, 0.22)",
});
