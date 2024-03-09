import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import ProductListing from "../pages/ProductListing";
import ProductDisplay from "../pages/ProductDisplay";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Error from "../pages/Error";

export const links = {
  category: (id) => `/category/${id}`,
  product: (id) => `/product/${id}`,
  cart: "/cart/",
  checkout: "/checkout",
};

export default class Router extends React.Component {
  routes = [
    {
      path: "/",
      exact: true,
      render: () =>
        this.props.def ? <Redirect to={this.props.def} /> : <div>root</div>,
    },
    {
      path: "/category/:categoryId",
      render: (props) => <ProductListing {...props} />,
    },
    {
      path: "/product/:productId",
      render: (props) => <ProductDisplay {...props} />,
    },
    {
      path: "/cart/",
      render: (props) => <Cart {...props} />,
    },
    {
      path: "/checkout/",
      render: (props) => <Checkout {...props} />,
    },
    {
      path: "*",
      render: () => <Error />,
    },
  ];

  render() {
    return (
      <BrowserRouter>
        {this.props.header}
        <Switch>
          {this.routes.map((props, index) => (
            <Route {...props} key={index} />
          ))}
        </Switch>
        {this.props.footer}
      </BrowserRouter>
    );
  }
}
