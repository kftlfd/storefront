import { Component, ComponentType, lazy, Suspense } from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import { LoadingSpinner } from '@/components/LoadingSpinner';

const Cart = lazy(() => import('@/pages/Cart'));
const Category = lazy(() => import('@/pages/Category'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const Error = lazy(() => import('@/pages/Error'));
const Product = lazy(() => import('@/pages/Product'));

export const links = {
  root: '/',
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
      component: suspended(Category),
    },
    {
      path: '/product/:productId',
      component: suspended(Product),
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
