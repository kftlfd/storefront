import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Product } from '@/api/types';
import chevronIcon from '@/assets/chevron.svg';
import minusIcon from '@/assets/minus.svg';
import plusIcon from '@/assets/plus.svg';
import { CartItem as CartItemType } from '@/store/cart';
import { formatPrice } from '@/utils/price';

import { ProductAttributes } from './ProductAttributes';
import { links } from './Router';

interface Props {
  product: Product;
  cartItemIndex: number;
  increaseQuantity: (index: number) => void;
  decreaseQuantity: (index: number) => void;
  closeCart: () => void;
  mini?: boolean;
  item: CartItemType;
  currency: string;
}

interface State {
  imgIndex: number;
}

class CartItem extends Component<Props, State> {
  galleryCount: number;

  constructor(props: Props) {
    super(props);
    this.state = {
      imgIndex: 0,
    };
    this.galleryCount = this.props.product.gallery.length;
  }

  increaseQuantity = () => this.props.increaseQuantity(this.props.cartItemIndex);

  decreaseQuantity = () => this.props.decreaseQuantity(this.props.cartItemIndex);

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

    const price = formatPrice(product.prices, this.props.currency, item.quantity);

    return (
      <CartItemDiv className={mini ? 'CartItem MiniCart' : 'CartItem'}>
        <div className="CartItemInfo">
          <div className="brand">{product.brand}</div>
          <div className="name" onClick={this.props.closeCart}>
            <ProductLink to={links.product(product.id)}>{product.name}</ProductLink>
          </div>
          {Object.keys(item.attributes).length > 0 && (
            <ProductAttributes
              attributes={product.attributes ?? []}
              selected={item.attributes}
              small={this.props.mini}
              displayOnly={true}
            />
          )}
          <div className="quantity-label">Quantity:</div>
          <div className="CartItemQuantity">
            <QuantityBtn onClick={this.decreaseQuantity}>
              <QuantityBtnIcon src={minusIcon} $mini={mini} />
            </QuantityBtn>
            <div className="count">{item.quantity}</div>
            <QuantityBtn onClick={this.increaseQuantity}>
              <QuantityBtnIcon src={plusIcon} $mini={mini} />
            </QuantityBtn>
          </div>
          <div className="price">{price}</div>
        </div>

        <CartItemImage
          className="CartItemImage"
          $img={mini ? undefined : product.gallery[this.state.imgIndex]}
        >
          {mini && <ProductImage src={product.gallery[this.state.imgIndex]} />}
          {!mini && this.galleryCount > 1 && (
            <div className="gallery-buttons">
              <button className="gallery-button" onClick={this.prevImage}>
                <img className="gallery-button-img left" src={chevronIcon} alt="Previous" />
              </button>
              <button className="gallery-button" onClick={this.nextImage}>
                <img className="gallery-button-img right" src={chevronIcon} alt="Next" />
              </button>
            </div>
          )}
        </CartItemImage>
      </CartItemDiv>
    );
  }
}

export default CartItem;

const CartItemDiv = styled.div`
  transition: ${({ theme }) => theme.transition.default};
  border-bottom: 1px solid ${({ theme }) => theme.color.bgHover};

  &:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.color.bgHover};
  }
`;

const ProductLink = styled(Link)`
  color: ${({ theme }) => theme.color.text};
  text-decoration: none;

  :visited {
    color: ${({ theme }) => theme.color.text};
  }
  :hover {
    text-decoration: underline;
  }
`;

const QuantityBtn = styled.button`
  border: none;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.color.bgButton};
  transition: ${({ theme }) => theme.transition.default};
  height: 100%;
  aspect-ratio: 1/1;
  display: grid;
  place-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.bgHover};
  }
`;

const QuantityBtnIcon = styled.img<{ $mini?: boolean }>`
  filter: ${({ theme }) => theme.img.filter};
  width: ${({ $mini }) => ($mini ? '0.8rem' : '1rem')};
`;

const CartItemImage = styled.div<{ $img?: string }>`
  background-image: url(${({ $img }) => $img ?? ''});
  border-radius: ${({ theme }) => theme.size.borderRadius};
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 250px;
  border-radius: ${({ theme }) => theme.size.borderRadius};
`;
