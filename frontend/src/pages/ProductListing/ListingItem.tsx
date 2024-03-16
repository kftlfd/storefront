import { Component, MouseEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './ListingItem.scss';
import styled from 'styled-components';

import { Product } from '@/api/types';
import cartIcon from '@/assets/cart.svg';
import { links } from '@/components/Router';
import { formatPrice } from '@/utils/price';

interface Props extends RouteComponentProps {
  item: Product;
  currency: string;
  addToCart: (id: string) => void;
}

class ListingItem extends Component<Props> {
  handleClick = () => {
    this.props.history.push(links.product(this.props.item.id));
  };

  handleQuickAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    this.props.addToCart(this.props.item.id);
  };

  render() {
    const { item, currency } = this.props;
    const available = item.inStock;
    const price = formatPrice(item.prices, currency);

    return (
      <Card
        className={`ListingItemCard ${!available && 'out-of-stock'}`}
        onClick={this.handleClick}
      >
        <div className="product-image-container">
          <ProductImage src={item.gallery[0]} alt={item.name} />
          <QuickAddBtnContainer className="quick-add-btn" onClick={this.handleQuickAdd}>
            <QuickAddBtn src={cartIcon} alt={`buy ${item.name}`} />
          </QuickAddBtnContainer>
          {!available && <div className="out-of-stock-overlay">Out of stock</div>}
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

export default withRouter(ListingItem);

const Card = styled.div`
  transition: ${(props) => props.theme.transition.default};
  border-radius: ${(props) => props.theme.size.borderRadius};

  &:hover {
    box-shadow: ${(props) => props.theme.shadow.normal};
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  min-height: 6rem;
  max-height: inherit;
  display: block;
  border-radius: ${(props) => props.theme.size.borderRadius};
  text-align: center;
  color: ${(props) => props.theme.color.text};
`;

const QuickAddBtnContainer = styled.button`
  transition: ${(props) => props.theme.transition.default};
  background-color: ${(props) => props.theme.color.accent};

  &:hover {
    background-color: ${(props) => props.theme.color.accentHover};
  }
`;

const QuickAddBtn = styled.img`
  height: 1.2rem;
  filter: invert(100%);
`;
