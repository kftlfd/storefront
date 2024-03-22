import { Component, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import CategoryView from '@/features/category/CategoryView';
import { PageContainer, PageMainText } from '@/layout/page';
import { StoreState } from '@/store';
import categoryApi from '@/store/categoryApi';
import { capitalizeFirst } from '@/utils/capitalize';

type RouteProps = RouteComponentProps<{ categoryId: string }>;

const withStore = connect(
  (state: StoreState, ownProps: RouteProps) => {
    const categoryId = ownProps.match.params.categoryId;
    return {
      categoryId,
      products: categoryApi.endpoints.getCategoryProducts.select(categoryId)(state),
    };
  },
  {
    getCategoryProducts: categoryApi.endpoints.getCategoryProducts.initiate,
  },
);

type Props = ConnectedProps<typeof withStore>;

class CategoryPage extends Component<Props> {
  unsubscribe: (() => void) | null = null;

  componentDidMount() {
    const query = this.props.getCategoryProducts(this.props.categoryId);
    this.unsubscribe = () => query.unsubscribe();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.categoryId !== this.props.categoryId) {
      this.unsubscribe?.();
      const query = this.props.getCategoryProducts(this.props.categoryId);
      this.unsubscribe = () => query.unsubscribe();
    }
  }

  componentWillUnmount(): void {
    this.unsubscribe?.();
  }

  render(): ReactNode {
    const { categoryId, products } = this.props;
    const title = capitalizeFirst(categoryId);

    if (products.isError) {
      document.title = 'Not found';
    } else {
      document.title = title;
    }

    return (
      <PageContainer>
        {products.isLoading ? (
          <PageMainText>
            <LoadingSpinner size={60} />
          </PageMainText>
        ) : products.isError || !products.data ? (
          <PageMainText>Page not found</PageMainText>
        ) : (
          <CategoryView categoryTitle={capitalizeFirst(categoryId)} products={products.data} />
        )}
      </PageContainer>
    );
  }
}

export default withRouter(withStore(CategoryPage));
