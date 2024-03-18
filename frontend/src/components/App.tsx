import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { getCategoriesAndCurrencies, getProductsByIds } from '@/api';
import type { Category, Currency, Product } from '@/api/types';
import Header from '@/features/header/Header';
import { PageWrapper } from '@/layout/page';
import Router, { links } from '@/pages/Router';
import type { StoreDispatch, StoreState } from '@/store';
import { loadCategoriesList } from '@/store/category';
import { loadCurrencies } from '@/store/currency';
import { loadProduct } from '@/store/products';

import Footer from './Footer';
import { SplashScreen } from './SplashScreen';

const mapStateToProps = (state: StoreState) => ({
  categories: state.category.ids,
  currencies: state.currency.list,
  products: state.products.items,
  cart: state.cart.items,
});

const mapDispatchToProps = (dispatch: StoreDispatch) => ({
  loadCategoriesList: (payload: Category[]) => dispatch(loadCategoriesList(payload)),
  loadCurrencies: (payload: Currency[]) => dispatch(loadCurrencies(payload)),
  loadProduct: (payload: Product) => dispatch(loadProduct(payload)),
});

const withStore = connect(mapStateToProps, mapDispatchToProps);

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
    this.setupApp().catch((err) => {
      this.setState({ error: err instanceof Error ? err.message : 'Unknown Error' });
    });
  }

  setupApp = async () => {
    // fetch list of categories and currencies if none/expired
    if (this.props.categories.length < 1 || this.props.currencies.length < 1) {
      const { categories, currencies } = await getCategoriesAndCurrencies();
      this.props.loadCategoriesList(categories);
      this.props.loadCurrencies(currencies);
    }

    // check products in cart, refetch if none/expired
    const idsToFetch: string[] = [];
    this.props.cart.forEach(({ id }) => {
      if (!idsToFetch.includes(id) && !this.props.products[id]?.loaded) {
        idsToFetch.push(id);
      }
    });
    if (idsToFetch.length > 0) {
      const products = await getProductsByIds(idsToFetch);
      for (const p of products) {
        this.props.loadProduct(p);
      }
    }

    this.setState({ loading: false });
  };

  render() {
    if (this.state.error) {
      return (
        <PageWrapper>
          <SplashScreen error={this.state.error} />
        </PageWrapper>
      );
    }

    if (this.state.loading) {
      return (
        <PageWrapper>
          <SplashScreen />
        </PageWrapper>
      );
    }

    const defCategory = this.props.categories[0] ?? null;

    return (
      <PageWrapper>
        <Header />
        <Router def={defCategory ? links.category(defCategory) : 'error'} />
        <Footer />
      </PageWrapper>
    );
  }
}

export default withStore(App);
