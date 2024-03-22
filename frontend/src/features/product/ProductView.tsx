import { Component, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Product } from '@/api/types';
import { AccentButton } from '@/components/Button';
import ProductAttributes from '@/features/product/ProductAttributes';
import ProductDescription from '@/features/product/ProductDescription';
import ProductGallery from '@/features/product/ProductGallery';
import ProductPrice from '@/features/product/ProductPrice';
import { links } from '@/routing/Router';
import { StoreState } from '@/store';
import { addToCart, toggleMiniCart } from '@/store/cart';
import { capitalizeFirst } from '@/utils/capitalize';

const withStore = connect(
  (state: StoreState) => ({
    currency: state.settings.selectedCurrency,
  }),
  {
    addToCart,
    toggleMiniCart,
  },
);

type StoreProps = ConnectedProps<typeof withStore>;

interface Props extends StoreProps {
  product: Product;
}

interface State {
  selectedAttrs: Record<string, string>;
}

class ProductView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const attributes = this.props.product.attributes ?? [];

    const selectedAttrs = attributes.reduce<Record<string, string>>((selected, attr) => {
      const firstItem = attr.items[0];
      if (firstItem) {
        selected[attr.id] = firstItem.id;
      }
      return selected;
    }, {});

    this.state = { selectedAttrs };
  }

  componentDidMount(): void {
    document.title = this.props.product.name;
  }

  selectAttr = (attrId: string, valId: string) => {
    this.setState((prev) => ({
      selectedAttrs: { ...prev.selectedAttrs, [attrId]: valId },
    }));
  };

  addToCart = () => {
    this.props.addToCart({
      id: this.props.product.id,
      attributes: this.state.selectedAttrs,
    });
    this.props.toggleMiniCart(true);
  };

  render(): ReactNode {
    const { product } = this.props;
    const { attributes = [] } = product;

    return (
      <ProductDisplayContainer>
        <ProductGallery gallery={product.gallery} name={product.name} />

        <div>
          <ProductInfo.Category>
            Category:{' '}
            <CategoryLink to={links.category(product.category)}>
              {capitalizeFirst(product.category)}
            </CategoryLink>
          </ProductInfo.Category>
          <ProductInfo.Brand>{product.brand}</ProductInfo.Brand>
          <ProductInfo.Name className="name">{product.name}</ProductInfo.Name>

          {attributes.length > 0 && (
            <ProductAttributes
              attributes={attributes}
              selected={this.state.selectedAttrs}
              selectAttr={this.selectAttr}
            />
          )}

          {spacer}
          <ProductPrice currency={this.props.currency ?? ''} prices={product.prices} />
          {spacer}

          {product.inStock && (
            <AccentButton $big $biggerFont onClick={this.addToCart}>
              Add to cart
            </AccentButton>
          )}

          {spacer}
          <ProductDescription html={product.description ?? ''} />
        </div>
      </ProductDisplayContainer>
    );
  }
}

export default withStore(ProductView);

const spacer = <div style={{ display: 'inline-block', height: '2rem' }}></div>;

const ProductDisplayContainer = styled.div`
  padding-block: min(4rem, 8vh);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 799px) {
    grid-template-columns: 100%;
  }
`;

const ProductInfo = {
  Category: styled.div`
    margin-bottom: 1rem;
  `,

  Brand: styled.div`
    font-size: 1.5rem;
  `,

  Name: styled.div`
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 2rem;
  `,
};

const CategoryLink = styled(Link)`
  font-weight: 500;
  color: ${({ theme }) => theme.color.text};
  text-decoration: none;

  :visited {
    color: ${({ theme }) => theme.color.text};
  }
  :hover {
    text-decoration: underline;
  }
`;
