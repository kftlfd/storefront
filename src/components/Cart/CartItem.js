import React from "react";
import styled from "styled-components";

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
  }

  render() {
    const { item, product, mini, increaseQuantity, decreaseQuantity } =
      this.props;

    const galleryCount = product.gallery.length;

    const prevImage = () =>
      this.setState((prev) => ({
        imgIndex: (prev.imgIndex + galleryCount - 1) % galleryCount,
      }));

    const nextImage = () =>
      this.setState((prev) => ({
        imgIndex: (prev.imgIndex + 1) % galleryCount,
      }));

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
          <div className="name">{product.name}</div>
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
            <QuantityBtn onClick={decreaseQuantity}>
              <QuantityBtnIcon src={minusIcon} mini={mini} />
            </QuantityBtn>
            <div className="count">{item.quantity}</div>
            <QuantityBtn onClick={increaseQuantity}>
              <QuantityBtnIcon src={plusIcon} mini={mini} />
            </QuantityBtn>
          </div>
          <div className="price">{price}</div>
        </div>

        <CartItemImage
          className="CartItemImage"
          img={product.gallery[this.state.imgIndex]}
        >
          {!mini && galleryCount > 1 && (
            <div className="gallery-buttons">
              <button className="gallery-button" onClick={prevImage}>
                <img
                  className="gallery-button-img left"
                  src={chevronIcon}
                  alt="Previous"
                />
              </button>
              <button className="gallery-button" onClick={nextImage}>
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
