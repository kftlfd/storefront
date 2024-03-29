import { Component, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { useCategoriesCurrenciesProductsQuery } from '@/api/graphql';
import Footer from '@/components/Footer';
import { SplashScreen } from '@/components/SplashScreen';
import Header from '@/features/header/Header';
import { PageWrapper } from '@/layout/page';
import Router, { links } from '@/routing/Router';
import type { StoreState } from '@/store';
import { loadProduct } from '@/store/products';
import { loadCategoriesList, loadCurrencies } from '@/store/settings';

const withStore = connect(
  (state: StoreState) => ({
    categories: state.settings.categories,
    cart: state.cart.items,
  }),
  {
    loadCategoriesList,
    loadCurrencies,
    loadProduct,
  },
);

export type StoreProps = ConnectedProps<typeof withStore>;

export class App extends Component<StoreProps> {
  productIds: string[] = [];

  constructor(props: StoreProps) {
    super(props);
    this.productIds = Array.from(new Set(this.props.cart.map((p) => p.id)));
  }

  render() {
    return <WithQuery {...this.props} productIds={this.productIds} />;
  }
}

const WithQuery = ({
  productIds,
  ...props
}: Omit<ApppProps, 'query'> & { productIds: string[] }) => {
  const q = useCategoriesCurrenciesProductsQuery(productIds);

  const newProps: ApppProps = { ...props, query: q };

  return <Appp {...newProps} />;
};

type ApppProps = StoreProps & { query: ReturnType<typeof useCategoriesCurrenciesProductsQuery> };

class Appp extends Component<ApppProps> {
  loadData = () => {
    const { data } = this.props.query;
    if (data) {
      this.props.loadCategoriesList(data.categories);
      this.props.loadCurrencies(data.currencies);
      this.props.loadProduct(data.products);
    }
  };

  componentDidMount(): void {
    this.loadData();
  }

  componentDidUpdate(): void {
    this.loadData();
  }

  render(): ReactNode {
    const { loading, error, data } = this.props.query;
    const defCategory = data?.categories[0] ?? null;
    const defaultRoute = defCategory ? links.category(defCategory) : 'error';

    return (
      <PageWrapper>
        {error ? (
          <SplashScreen error={error.message} />
        ) : loading ? (
          <SplashScreen />
        ) : (
          <>
            <Header />
            <Router def={defaultRoute} />
            <Footer />
          </>
        )}
      </PageWrapper>
    );
  }
}

export default withStore(App);
