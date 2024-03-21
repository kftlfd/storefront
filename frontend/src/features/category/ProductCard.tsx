import { Component, MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { getProductById } from '@/api';
import { Product } from '@/api/types';
import CartIcon from '@/assets/cart.svg?react';
import { links } from '@/pages/Router';
import { StoreState } from '@/store';
import { addToCart, toggleMiniCart } from '@/store/cart';
import { loadProduct } from '@/store/products';
import { formatPrice } from '@/utils/price';

const withStore = connect(
  (state: StoreState) => ({
    currency: state.settings.selectedCurrency,
    products: state.products.products,
  }),
  {
    addToCart,
    toggleMiniCart,
    loadProduct,
  },
);

type StoreProps = ConnectedProps<typeof withStore>;

interface Props extends StoreProps, RouteComponentProps {
  item: Product;
}

class ProductCard extends Component<Props> {
  loadProduct = async (id: string) => {
    const product = await getProductById(id);
    this.props.loadProduct(product);
    return product;
  };

  addToCart = async () => {
    const { item, products } = this.props;
    const { id } = item;

    const product = products[id]?.loaded ? products[id] : await this.loadProduct(id);

    if (!product) {
      console.warn('No product');
      return;
    }

    const attributes: Record<string, string> = {};
    product.attributes?.forEach((attr) => {
      const itemId = attr.items[0]?.id;
      if (itemId) {
        attributes[attr.id] = itemId;
      }
    });

    this.props.addToCart({ id, attributes });
    this.props.toggleMiniCart(true);
  };

  handleClick = () => {
    this.props.history.push(links.product(this.props.item.id));
  };

  handleQuickAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    void this.addToCart();
  };

  render() {
    const { item, currency } = this.props;
    const available = item.inStock;
    const price = formatPrice(item.prices, currency ?? '');

    return (
      <Card className={available ? '' : 'out-of-stock'} onClick={this.handleClick}>
        <ProductImageContainer>
          <ProductImage src={item.gallery[0]} alt={item.name} />
          <QuickAddBtn onClick={this.handleQuickAdd}>
            <QuickAddIcon />
          </QuickAddBtn>
          {!available && <OutOfStockOverlay>Out of stock</OutOfStockOverlay>}
        </ProductImageContainer>

        <div>
          <ProductInfo.Brand>{item.brand}</ProductInfo.Brand>
          <ProductInfo.Name>{item.name}</ProductInfo.Name>
          <ProductInfo.Price>{price}</ProductInfo.Price>
        </div>
      </Card>
    );
  }
}

export default withRouter(withStore(ProductCard));

const Card = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 24px;
  cursor: pointer;
  transition: ${(props) => props.theme.transition.default};
  border-radius: ${(props) => props.theme.size.borderRadius};

  &.out-of-stock {
    opacity: 0.5;
  }

  &:hover {
    box-shadow: ${(props) => props.theme.shadow.normal};
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  max-height: 350px;
  display: flex;
  justify-content: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  min-height: 6rem;
  max-height: inherit;
  border-radius: ${(props) => props.theme.size.borderRadius};
  text-align: center;
  color: ${(props) => props.theme.color.text};
`;

const QuickAddBtn = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  translate: -30% 50%;
  padding: 0;
  margin: 0;
  border: none;
  height: 3rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: ${(props) => props.theme.transition.default};
  background-color: ${(props) => props.theme.color.accent};
  visibility: hidden;
  opacity: 0;

  &:hover {
    background-color: ${(props) => props.theme.color.accentHover};
  }

  ${Card}:not(.out-of-stock):hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const QuickAddIcon = styled(CartIcon)`
  height: 1.2rem;
  fill: white;
`;

const OutOfStockOverlay = styled.div`
  position: absolute;
  inset-block: 0;
  inset: 0;
  display: grid;
  place-content: center;
  text-transform: uppercase;
  font-size: 1.5rem;
`;

const ProductInfo = {
  Brand: styled.div`
    font-weight: 400;
  `,
  Name: styled.div`
    margin-block: 4px;
    font-size: 1.2rem;
    font-weight: 300;
  `,
  Price: styled.div`
    font-weight: 500;
  `,
};
