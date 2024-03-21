import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { getCategoriesAndCurrencies, getProductsByIds } from '@/api';
import Header from '@/features/header/Header';
import { PageWrapper } from '@/layout/page';
import Router, { links } from '@/pages/Router';
import type { StoreState } from '@/store';
import { loadCategoriesList, loadProduct } from '@/store/products';
import { loadCurrencies } from '@/store/settings';

import Footer from './Footer';
import { SplashScreen } from './SplashScreen';

const withStore = connect(
  (state: StoreState) => ({
    categories: state.products.categories,
    products: state.products.products,
    cart: state.cart.items,
  }),
  {
    loadCategoriesList,
    loadCurrencies,
    loadProduct,
  },
);

export type StoreProps = ConnectedProps<typeof withStore>;

interface AppProps extends StoreProps {}

interface AppState {
  loading: boolean;
  error: null | string;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
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
    // fetch list of categories and currencies
    const { categories, currencies } = await getCategoriesAndCurrencies();
    this.props.loadCategoriesList(categories);
    this.props.loadCurrencies(currencies);

    // fetch products in cart (saved to local storage)
    const idsToFetch = Array.from(new Set(this.props.cart.map((p) => p.id)));
    if (idsToFetch.length < 1) return;
    const products = await getProductsByIds(idsToFetch);
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
