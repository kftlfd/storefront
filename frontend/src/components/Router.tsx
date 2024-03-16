import { Component, ReactNode } from 'react';
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Error from '@/pages/Error';
import ProductDisplay from '@/pages/ProductDisplay';
import ProductListing from '@/pages/ProductListing';

export const links = {
  category: (id: string) => `/category/${id}`,
  product: (id: string) => `/product/${id}`,
  cart: '/cart/',
  checkout: '/checkout',
};

interface Props {
  def: string;
  header: ReactNode;
  footer: ReactNode;
}

export default class Router extends Component<Props> {
  routes: RouteProps[] = [
    {
      path: '/',
      exact: true,
      render: () => (this.props.def ? <Redirect to={this.props.def} /> : <div>root</div>),
    },
    {
      path: '/category/:categoryId',
      component: ProductListing,
    },
    {
      path: '/product/:productId',
      component: ProductDisplay,
    },
    {
      path: '/cart/',
      component: Cart,
    },
    {
      path: '/checkout/',
      component: Checkout,
    },
    {
      path: '*',
      component: Error,
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
