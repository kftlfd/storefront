import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Currency, Product } from '@/api/types';
import ChevronIcon from '@/assets/chevron.svg?react';
import MinusIcon from '@/assets/minus.svg?react';
import PlusIcon from '@/assets/plus.svg?react';
import ProductAttributes from '@/features/product/ProductAttributes';
import { links } from '@/routing/Router';
import { CartItem } from '@/store/cart';
import { formatPrice } from '@/utils/price';

interface Props {
  item: CartItem;
  product: Product;
  currency: Currency | null;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  closeCart: () => void;
  mini?: boolean;
}

interface State {
  imgIndex: number;
}

class CartItemView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { imgIndex: 0 };
  }

  setImage = (val: 'prev' | 'next') => {
    const galleryLen = this.props.product.gallery.length;

    switch (val) {
      case 'prev':
        this.setState((prev) => ({
          imgIndex: (prev.imgIndex - 1 + galleryLen) % galleryLen,
        }));
        break;

      case 'next':
        this.setState((prev) => ({
          imgIndex: (prev.imgIndex + 1) % galleryLen,
        }));
    }
  };

  render() {
    const { item, product, currency, mini, decreaseQuantity, increaseQuantity, closeCart } =
      this.props;

    const price = formatPrice(product.prices, currency, item.quantity);

    return (
      <CartItemDiv className={mini ? 'mini' : ''}>
        <CartItemInfo.Container>
          <CartItemInfo.Brand>{product.brand}</CartItemInfo.Brand>
          <CartItemInfo.Name onClick={closeCart}>
            <ProductLink to={links.product(product.id)}>{product.name}</ProductLink>
          </CartItemInfo.Name>
          {Object.keys(item.attributes).length > 0 && (
            <ProductAttributes
              attributes={product.attributes ?? []}
              selected={item.attributes}
              small={mini}
              displayOnly
            />
          )}
          <CartItemInfo.QuantityLabel>Quantity:</CartItemInfo.QuantityLabel>
          <CartItemQuantity>
            <QuantityBtn onClick={decreaseQuantity}>
              <QuantityMinusIcon $mini={mini} />
            </QuantityBtn>
            <QuantityCount>{item.quantity}</QuantityCount>
            <QuantityBtn onClick={increaseQuantity}>
              <QuantityPlusIcon $mini={mini} />
            </QuantityBtn>
          </CartItemQuantity>
          <CartItemInfo.Price>{price}</CartItemInfo.Price>
        </CartItemInfo.Container>

        <CartItemImage $img={mini ? undefined : product.gallery[this.state.imgIndex]}>
          {mini && <ProductImage src={product.gallery[this.state.imgIndex]} />}
          {!mini && product.gallery.length > 1 && (
            <GalleryButtons>
              <GalleryBtn onClick={() => this.setImage('prev')}>
                <Chevron style={{ rotate: '90deg' }} />
              </GalleryBtn>
              <GalleryBtn onClick={() => this.setImage('next')}>
                <Chevron style={{ rotate: '-90deg' }} />
              </GalleryBtn>
            </GalleryButtons>
          )}
        </CartItemImage>
      </CartItemDiv>
    );
  }
}

export default CartItemView;

const CartItemDiv = styled.div`
  display: flex;
  gap: 1rem;
  padding-block: 1.5rem;
  padding-inline: 0;

  transition: ${({ theme }) => theme.transition.default};
  border-bottom: 1px solid ${({ theme }) => theme.color.bgHover};

  &:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.color.bgHover};
  }
  &:not(:first-of-type) {
    margin-top: 0;
  }

  &.mini {
    padding-block: 1rem;
    margin-inline: 1rem;

    &:first-of-type {
      border-top: none;
    }

    &:last-of-type {
      border-bottom: none;
    }

    &:first-of-type {
      padding-top: 0;
    }

    &:last-of-type {
      padding-bottom: 0;
    }
  }
`;

const CartItemInfo = {
  Container: styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  `,
  Brand: styled.div`
    font-size: 1rem;

    .mini & {
      font-size: 1rem;
    }
  `,
  Name: styled.div`
    align-self: flex-start;
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;

    .mini & {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
  `,
  QuantityLabel: styled.div`
    margin-top: 1rem;
    margin-bottom: 4px;
    font-weight: 500;

    .mini & {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      font-weight: 400;
    }
  `,
  Price: styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 1rem;

    .mini & {
      font-size: 16px;
      margin-top: 0.5rem;
    }
  `,
};

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

const CartItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 2rem;
  font-size: 1rem;

  .mini & {
    gap: 1rem;
    height: 1.5rem;
  }

  .button {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    border: none;
    border-radius: 0;
    width: 100%;
    aspect-ratio: 1/1;
    padding: 0;
    cursor: pointer;
  }
`;

const QuantityCount = styled.div`
  font-weight: 500;
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

const QuantityIcon = styled.div<{ $mini?: boolean }>`
  fill: ${({ theme }) => theme.color.text};
  width: ${({ $mini }) => ($mini ? '0.8rem' : '1rem')};
`;

const QuantityMinusIcon = QuantityIcon.withComponent(MinusIcon);
const QuantityPlusIcon = QuantityIcon.withComponent(PlusIcon);

const CartItemImage = styled.div<{ $img?: string }>`
  width: 200px;
  flex: 0 0 auto;
  background-size: cover;
  background-position: center;
  position: relative;

  display: flex;
  justify-content: flex-end;
  align-items: flex-start;

  background-image: url(${({ $img }) => $img ?? ''});
  border-radius: ${({ theme }) => theme.size.borderRadius};

  .mini & {
    width: 120px;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 250px;
  border-radius: ${({ theme }) => theme.size.borderRadius};
`;

const GalleryButtons = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`;

const GalleryBtn = styled.button`
  padding: 0;
  border: none;
  border-radius: 3px;
  display: grid;
  place-content: center;
  height: 24px;
  width: 24px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.73);

  &:hover {
    background-color: rgba(0, 0, 0, 0.53);
  }
`;

const Chevron = styled(ChevronIcon)`
  width: 12px;
  fill: white;
`;
