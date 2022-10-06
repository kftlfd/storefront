import React from "react";
import styled from "styled-components";

import plusBtn from "../../assets/plusBtn.svg";
import minusBtn from "../../assets/minusBtn.svg";
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

    const selectAttr = (attrId, valId) => {
      // Disabled in cart as per spec
    };

    const galleryCount = product.gallery.length;

    const prevImage = () =>
      this.setState((prev) => ({
        imgIndex: (prev.imgIndex + galleryCount - 1) % galleryCount,
      }));

    const nextImage = () =>
      this.setState((prev) => ({
        imgIndex: (prev.imgIndex + 1) % galleryCount,
      }));

    const price = formatPrice(product.prices, this.props.currency);

    return (
      <div className={mini ? "CartItem MiniCart" : "CartItem"} mini={mini}>
        <div className="CartItemInfo">
          <div className="brand">{product.brand}</div>
          <div className="name">{product.name}</div>
          <div className="price">{price}</div>
          <ProductAttributes
            attributes={product.attributes}
            selected={item.attributes}
            selectAttr={selectAttr}
            small={this.props.mini}
            displayOnly={true}
          />
        </div>

        <div className="CartItemQuantity">
          <QuantityBtn
            className="button"
            img={plusBtn}
            onClick={increaseQuantity}
          />
          <div className="count">{item.quantity}</div>
          <QuantityBtn
            className="button"
            img={minusBtn}
            onClick={decreaseQuantity}
          />
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
      </div>
    );
  }
}

const QuantityBtn = styled.button({
  backgroundColor: (props) => props.theme.color.bg,
  backgroundImage: (props) => `url(${props.img})`,
  transition: (props) => props.theme.transition.standard,
  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
});

const CartItemImage = styled.div({
  backgroundImage: (props) => `url(${props.img})`,
});
