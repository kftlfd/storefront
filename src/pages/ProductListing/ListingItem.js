import React from "react";
import styled from "styled-components";

import { links } from "../../components/Router";
import { formatPrice } from "../../utils/price";

import "./ListingItem.scss";
import cartIcon from "../../assets/cart.svg";

export class ListingItem extends React.Component {
  handleClick = () => {
    this.props.navigate(links.product(this.props.item.id));
  };

  handleQuickAdd = (e) => {
    e.stopPropagation();
    this.props.addToCart(this.props.item.id);
  };

  render() {
    const { item, currency } = this.props;
    const available = item.inStock;
    const price = formatPrice(item.prices, currency);

    return (
      <Card
        className={`ListingItemCard ${!available && "out-of-stock"}`}
        onClick={this.handleClick}
      >
        <div className="product-image-container">
          <ProductImage src={item.gallery[0]} alt={item.name} />
          <QuickAddBtnContainer
            className="quick-add-btn"
            onClick={this.handleQuickAdd}
          >
            <QuickAddBtn src={cartIcon} alt={`buy ${item.name}`} />
          </QuickAddBtnContainer>
          {!available && (
            <div className="out-of-stock-overlay">Out of stock</div>
          )}
        </div>

        <div className="product-info">
          <div className="brand">{item.brand}</div>
          <div className="name">{item.name}</div>
          <div className="price">{price}</div>
        </div>
      </Card>
    );
  }
}

const Card = styled.div({
  transition: (props) => props.theme.transition.default,
  borderRadius: (props) => props.theme.size.borderRadius,
  "&:hover": {
    boxShadow: (props) => props.theme.shadow.normal,
  },
});

const ProductImage = styled.img({
  maxWidth: "100%",
  minHeight: "6rem",
  maxHeight: "inherit",
  display: "block",
  borderRadius: (props) => props.theme.size.borderRadius,
  textAlign: "center",
  color: (props) => props.theme.color.text,
});

const QuickAddBtnContainer = styled.button({
  transition: (props) => props.theme.transition.default,
  backgroundColor: (props) => props.theme.color.accent,
  "&:hover": {
    backgroundColor: (props) => props.theme.color.accentHover,
  },
});

const QuickAddBtn = styled.img({
  height: "1.2rem",
  filter: "invert(100%)",
});
