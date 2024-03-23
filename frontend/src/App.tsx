import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { getCategoriesCurrenciesCartProducts } from '@/api';
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

interface State {
  loading: boolean;
  error: null | string;
}

export class App extends React.Component<StoreProps, State> {
  constructor(props: StoreProps) {
    super(props);
    this.state = {
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setupApp()
      .then(() => {
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ error: err instanceof Error ? err.message : 'Unknown Error' });
      });
  }

  setupApp = async () => {
    const productIdsInCart = Array.from(new Set(this.props.cart.map((p) => p.id)));

    const { categories, currencies, products } =
      await getCategoriesCurrenciesCartProducts(productIdsInCart);

    this.props.loadCategoriesList(categories);
    this.props.loadCurrencies(currencies);
    this.props.loadProduct(products);
  };

  render() {
    const { error, loading } = this.state;
    const defCategory = this.props.categories[0] ?? null;
    const defaultRoute = defCategory ? links.category(defCategory) : 'error';

    return (
      <PageWrapper>
        {error ? (
          <SplashScreen error={error} />
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
