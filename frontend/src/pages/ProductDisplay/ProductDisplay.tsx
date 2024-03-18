import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { getProductById } from '@/api';
import { AccentButton } from '@/components/Button';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ProductAttributes } from '@/components/ProductAttributes';
import { PageContainer, PageMainText } from '@/layout/page';
import { links } from '@/pages/Router';
import { StoreState } from '@/store';
import { addToCart, toggleMiniCart } from '@/store/cart';
import { loadProduct } from '@/store/products';

import ProductDescription from './ProductDescription';
import ProductGallery from './ProductGallery';
import ProductPrice from './ProductPrice';

type RouterProps = RouteComponentProps<{ productId: string }>;

const withStore = connect(
  (state: StoreState, ownProps: RouterProps) => ({
    currency: state.currency.selected,
    productId: ownProps.match.params.productId,
    product: state.products.items[ownProps.match.params.productId]!,
    getProductById,
  }),
  {
    loadProduct,
    addToCart,
    toggleMiniCart,
  },
);

type StoreProps = ConnectedProps<typeof withStore>;

interface Props extends StoreProps, RouterProps {}

interface State {
  loading: boolean;
  error: string | null;
  selectedAttrs: Record<string, string>;
}

class ProductDisplay extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      selectedAttrs: {},
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    void this.prepareProduct();
  }

  loadProduct = async () => {
    if (this.props.product && this.props.product.loaded) {
      return this.props.product;
    }
    try {
      const product = await this.props.getProductById(this.props.match.params.productId);
      this.props.loadProduct(product);
      return product;
    } catch (err) {
      this.setState({ error: err instanceof Error ? err.message : 'Error' });
      document.title = 'Not found';
      return null;
    }
  };

  prepareProduct = async () => {
    const product = await this.loadProduct();
    if (!product) return;

    const selectedAttrs: Record<string, string> = {};
    const attributes = product.attributes || [];
    attributes.forEach((attr) => (selectedAttrs[attr.id] = attr.items[0]!.id));

    this.setState({ loading: false, selectedAttrs });
    document.title = product.name;
  };

  selectAttr = (attrId: string, valId: string) => {
    this.setState((prev) => ({
      ...prev,
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

  render() {
    if (this.state.error) {
      return (
        <PageContainer>
          <PageMainText>{/*this.state.error*/}Page not found</PageMainText>
        </PageContainer>
      );
    }

    if (this.state.loading) {
      return (
        <PageContainer>
          <PageMainText>
            <LoadingSpinner size={60} />
          </PageMainText>
        </PageContainer>
      );
    }

    const product = this.props.product;
    const { attributes = [] } = product;

    return (
      <PageContainer>
        <ProductDisplayContainer>
          <ProductGallery gallery={product.gallery} name={product.name} />

          <div>
            <ProductInfo.Category>
              Category:{' '}
              <CategoryLink to={links.category(product.category)}>
                {product.category[0]?.toUpperCase() + product.category.slice(1)}
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
            <ProductPrice currency={this.props.currency ?? ''} prices={product.prices} />
            {product.inStock && (
              <AccentButton big={true} biggerFont={true} onClick={this.addToCart}>
                Add to cart
              </AccentButton>
            )}
            <ProductDescription html={product.description ?? ''} />
          </div>
        </ProductDisplayContainer>
      </PageContainer>
    );
  }
}

export default withRouter(withStore(ProductDisplay));

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
