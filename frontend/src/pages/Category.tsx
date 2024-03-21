import { Component, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { getProductsByCategory } from '@/api';
import { Product } from '@/api/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import CategoryView from '@/features/category/CategoryView';
import { PageContainer, PageMainText } from '@/layout/page';
import { StoreState } from '@/store';
import { loadProductIdsByCategory, loadProductsBasics } from '@/store/products';
import { capitalizeFirst } from '@/utils/capitalize';

type RouterProps = RouteComponentProps<{ categoryId: string }>;

const withStore = connect(
  (state: StoreState, ownProps: RouterProps) => ({
    categoryId: ownProps.match.params.categoryId,
    categoryItems: state.products.productIdsByCategory[ownProps.match.params.categoryId],
    products: state.products.products,
  }),
  {
    loadProductIdsByCategory,
    loadProductsBasics,
  },
);

type StoreProps = ConnectedProps<typeof withStore>;

interface Props extends RouterProps, StoreProps {}

interface State {
  loading: boolean;
  error: string | null;
}

class CategoryPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.loadCategoryProducts();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.categoryId !== this.props.categoryId) {
      this.setState({
        error: null,
        loading: true,
      });
      this.loadCategoryProducts();
      window.scrollTo(0, 0);
    }
  }

  loadCategoryProducts = () => {
    const title = capitalizeFirst(this.props.categoryId);

    if (this.props.categoryItems) {
      this.setState({ loading: false });
      document.title = title;
      return;
    }

    getProductsByCategory(this.props.categoryId)
      .then(({ productIds, productItems }) => {
        const { categoryId } = this.props;
        this.props.loadProductIdsByCategory({ categoryId, productIds });
        this.props.loadProductsBasics(productItems);
        this.setState({ loading: false });
        document.title = title;
      })
      .catch((err) => {
        console.error(err);
        this.setState({ error: err instanceof Error ? err.message : 'error' });
        document.title = 'Not found';
      });
  };

  render(): ReactNode {
    const { categoryId, categoryItems } = this.props;

    const products = (categoryItems || [])
      .map((id) => this.props.products[id])
      .filter((p): p is Product => p !== undefined);

    return (
      <PageContainer>
        {this.state.loading ? (
          <PageMainText>
            <LoadingSpinner size={60} />
          </PageMainText>
        ) : this.state.error ? (
          <PageMainText>Page not found</PageMainText>
        ) : (
          <CategoryView categoryTitle={capitalizeFirst(categoryId)} products={products} />
        )}
      </PageContainer>
    );
  }
}

export default withRouter(withStore(CategoryPage));
