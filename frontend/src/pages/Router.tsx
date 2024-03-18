import { Component, ComponentType, lazy, Suspense } from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import { LoadingSpinner } from '@/components/LoadingSpinner';

const Cart = lazy(() => import('@/pages/Cart'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const Error = lazy(() => import('@/pages/Error'));
const ProductDisplay = lazy(() => import('@/pages/ProductDisplay'));
const ProductListing = lazy(() => import('@/pages/ProductListing'));

export const links = {
  category: (id: string) => `/category/${id}`,
  product: (id: string) => `/product/${id}`,
  cart: '/cart',
  checkout: '/checkout',
};

function suspended(El: ComponentType) {
  const SuspendedRoute = () => (
    <Suspense fallback={<LoadingSpinner />}>
      <El />
    </Suspense>
  );
  return SuspendedRoute;
}

interface Props {
  def: string;
}

class Router extends Component<Props> {
  routes: RouteProps[] = [
    {
      path: '/',
      exact: true,
      render: () => (this.props.def ? <Redirect to={this.props.def} /> : <div>root</div>),
    },
    {
      path: '/category/:categoryId',
      component: suspended(ProductListing),
    },
    {
      path: '/product/:productId',
      component: suspended(ProductDisplay),
    },
    {
      path: '/cart',
      component: suspended(Cart),
    },
    {
      path: '/checkout',
      component: suspended(Checkout),
    },
    {
      path: '*',
      component: suspended(Error),
    },
  ];

  render() {
    return (
      <Switch>
        {this.routes.map((props, index) => (
          <Route {...props} key={index} />
        ))}
      </Switch>
    );
  }
}

export default Router;
