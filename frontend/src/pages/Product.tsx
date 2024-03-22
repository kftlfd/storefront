import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { getProductById } from '@/api';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import ProductView from '@/features/product/ProductView';
import { PageContainer, PageMainText } from '@/layout/page';
import { StoreState } from '@/store';
import { loadProduct } from '@/store/products';

type RouterProps = RouteComponentProps<{ productId: string }>;

const withStore = connect(
  (state: StoreState, ownProps: RouterProps) => ({
    productId: ownProps.match.params.productId,
    product: state.products.products[ownProps.match.params.productId],
  }),
  {
    loadProduct,
  },
);

type StoreProps = ConnectedProps<typeof withStore>;

interface Props extends StoreProps, RouterProps {}

interface State {
  loading: boolean;
  error: string | null;
}

class ProductPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.loadProduct()
      .then(() => {
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ error: err instanceof Error ? err.message : 'Error' });
        document.title = 'Not found';
      });
  }

  loadProduct = async () => {
    if (this.props.product && this.props.product.loaded) {
      return;
    }
    const product = await getProductById(this.props.productId);
    this.props.loadProduct(product);
  };

  render() {
    const { product } = this.props;
    const { error, loading } = this.state;

    return (
      <PageContainer>
        {loading ? (
          <PageMainText>
            <LoadingSpinner size={60} />
          </PageMainText>
        ) : error || !product ? (
          <PageMainText>Page not found</PageMainText>
        ) : (
          <ProductView product={product} />
        )}
      </PageContainer>
    );
  }
}

export default withRouter(withStore(ProductPage));
