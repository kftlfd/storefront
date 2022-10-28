import React from "react";

import { getCategoriesAndCurrencies, getProductsByIds } from "../../api";
import type { StoreProps } from "./App.container";
import { PageWrapper } from "../../layout/page";
import Header from "../Header";
import Footer from "../Footer";
import Router, { links } from "../Router";
import { SplashScreen } from "../SplashScreen";

type AppProps = {} & StoreProps;

type AppState = {
  loading: boolean,
  error: null | string,
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
    this.setupApp().catch((err) => this.setState({ error: err.message }));
  }

  setupApp = async () => {
    // fetch list of categories and currencies if none/expired
    if (this.props.categories.length < 1 || this.props.currencies.length < 1) {
      const { categories, currencies } =
        await getCategoriesAndCurrencies();
      this.props.loadCategoriesList(categories);
      this.props.loadCurrencies(currencies);
    }

    // check products in cart, refetch if none/expired
    const idsToFetch: string[] = [];
    this.props.cart.forEach(({ id }) => {
      if (
        !idsToFetch.includes(id) &&
        (!this.props.products[id] || !this.props.products[id].loaded)
      ) {
        idsToFetch.push(id);
      }
    });
    if (idsToFetch.length > 0) {
      const products = await getProductsByIds(idsToFetch);
      for (let p of products) {
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

    return (
      <PageWrapper>
        <Router
          def={links.category(this.props.categories[0])}
          header={<Header />}
          footer={<Footer />}
        />
      </PageWrapper>
    );
  }
}
