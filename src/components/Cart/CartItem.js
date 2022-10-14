import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { links } from "../../components/Router";

import plusIcon from "../../assets/plus.svg";
import minusIcon from "../../assets/minus.svg";
import chevronIcon from "../../assets/chevron.svg";
import { ProductAttributes } from "../ProductAttributes";
import { formatPrice } from "../../utils/price";

export class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIndex: 0,
    };
    this.galleryCount = this.props.product.gallery.length;
  }

  increaseQuantity = () =>
    this.props.increaseQuantity(this.props.cartItemIndex);

  decreaseQuantity = () =>
    this.props.decreaseQuantity(this.props.cartItemIndex);

  prevImage = () => {
    this.setState((prev) => ({
      imgIndex: (prev.imgIndex - 1 + this.galleryCount) % this.galleryCount,
    }));
  };

  nextImage = () => {
    this.setState((prev) => ({
      imgIndex: (prev.imgIndex + 1 + this.galleryCount) % this.galleryCount,
    }));
  };

  render() {
    const { item, product, mini } = this.props;

    const price = formatPrice(
      product.prices,
      this.props.currency,
      item.quantity
    );

    return (
      <CartItemDiv
        className={mini ? "CartItem MiniCart" : "CartItem"}
        mini={mini}
      >
        <div className="CartItemInfo">
          <div className="brand">{product.brand}</div>
          <div className="name" onClick={this.props.closeCart}>
            <ProductLink to={links.product(product.id)}>
              {product.name}
            </ProductLink>
          </div>
          {Object.keys(item.attributes).length > 0 && (
            <ProductAttributes
              attributes={product.attributes}
              selected={item.attributes}
              small={this.props.mini}
              displayOnly={true}
            />
          )}
          <div className="quantity-label">Quantity:</div>
          <div className="CartItemQuantity">
            <QuantityBtn onClick={this.decreaseQuantity}>
              <QuantityBtnIcon src={minusIcon} mini={mini} />
            </QuantityBtn>
            <div className="count">{item.quantity}</div>
            <QuantityBtn onClick={this.increaseQuantity}>
              <QuantityBtnIcon src={plusIcon} mini={mini} />
            </QuantityBtn>
          </div>
          <div className="price">{price}</div>
        </div>

        <CartItemImage
          className="CartItemImage"
          img={!mini && product.gallery[this.state.imgIndex]}
        >
          {mini && <ProductImage src={product.gallery[this.state.imgIndex]} />}
          {!mini && this.galleryCount > 1 && (
            <div className="gallery-buttons">
              <button className="gallery-button" onClick={this.prevImage}>
                <img
                  className="gallery-button-img left"
                  src={chevronIcon}
                  alt="Previous"
                />
              </button>
              <button className="gallery-button" onClick={this.nextImage}>
                <img
                  className="gallery-button-img right"
                  src={chevronIcon}
                  alt="Next"
                />
              </button>
            </div>
          )}
        </CartItemImage>
      </CartItemDiv>
    );
  }
}

const CartItemDiv = styled.div({
  transition: (props) => props.theme.transition.default,
  borderBottom: (props) => `1px solid ${props.theme.color.bgHover}`,

  "&:first-of-type": {
    borderTop: (props) => `1px solid ${props.theme.color.bgHover}`,
  },
});

const ProductLink = styled(Link)({
  color: (props) => props.theme.color.text,
  textDecoration: "none",
  ":visited": {
    color: (props) => props.theme.color.text,
  },
  ":hover": {
    textDecoration: "underline",
  },
});

const QuantityBtn = styled.button({
  border: "none",
  borderRadius: "3px",
  backgroundColor: (props) => props.theme.color.bgButton,
  transition: (props) => props.theme.transition.default,
  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
  height: "100%",
  aspectRatio: "1/1",
  display: "grid",
  placeContent: "center",
  cursor: "pointer",
});

const QuantityBtnIcon = styled.img({
  filter: (props) => props.theme.img.filter,
  width: (props) => (props.mini ? "0.8rem" : "1rem"),
});

const CartItemImage = styled.div({
  backgroundImage: (props) => `url(${props.img})`,
  borderRadius: (props) => props.theme.size.borderRadius,
});

const ProductImage = styled.img({
  maxWidth: "100%",
  maxHeight: "250px",
  borderRadius: (props) => props.theme.size.borderRadius,
});
