import React from "react";
import styled from "styled-components";
import cartIcon from "../../assets/cart.svg";

import { links } from "../../components/Router";
import { formatPrice } from "../../utils/price";

export class ListingItem extends React.Component {
  render() {
    const { item, currency, navigate, addToCart } = this.props;

    const available = item.inStock;

    const handleClick = () => {
      navigate(links.product(item.id));
    };

    const handleQuickAdd = (e) => {
      e.stopPropagation();
      addToCart(item.id);
    };

    const price = formatPrice(item.prices, currency);

    return (
      <Card
        className={
          !available ? "ListingItemCard out-of-stock" : "ListingItemCard"
        }
        onClick={handleClick}
      >
        <div className="product-image-container">
          <img
            className="product-image"
            src={item.gallery[0]}
            alt={item.name}
          />
          <QuickAddBtnContainer
            className="quick-add-btn"
            onClick={handleQuickAdd}
          >
            <QuickAddBtn src={cartIcon} alt={`buy ${item.name}`} />
          </QuickAddBtnContainer>
          {!available && (
            <div className="out-of-stock-overlay">Out of stock</div>
          )}
        </div>

        <div className="product-info">
          <div className="name">{item.name}</div>
          <div className="price">{price}</div>
        </div>
      </Card>
    );
  }
}

const Card = styled.div({
  transition: (props) => props.theme.transition.default,
  "&:hover": {
    boxShadow: (props) => props.theme.shadow.normal,
  },
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
