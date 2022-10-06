import React from "react";

import Header from "../Header";
import Router, { links } from "../Router";
import { SplashScreen } from "../SplashScreen";

export class App extends React.Component {
  constructor(props) {
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
        await this.props.getCategoriesAndCurrencies();
      this.props.loadCategoriesList(categories);
      this.props.loadCurrencies(currencies);
    }

    // check products in cart, refetch if none/expired
    const idsToFetch = [];
    this.props.cart.forEach(({ id }) => {
      if (
        !idsToFetch.includes(id) &&
        (!this.props.products[id] || !this.props.products[id].loaded)
      ) {
        idsToFetch.push(id);
      }
    });
    if (idsToFetch.length > 0) {
      const products = await this.props.getProductsByIds(idsToFetch);
      for (let p of products) {
        this.props.loadProduct(p);
      }
    }

    this.setState({ loading: false });
  };

  render() {
    if (this.state.error) {
      return <SplashScreen error={this.state.error} />;
    }

    if (this.state.loading) {
      return <SplashScreen />;
    }

    return (
      <Router def={links.category(this.props.defCategory)}>
        <Header />
      </Router>
    );
  }
}
