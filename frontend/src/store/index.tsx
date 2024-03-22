import { Component, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import cart from './cart';
import products from './products';
import settings from './settings';

const store = configureStore({
  reducer: {
    products,
    cart,
    settings,
  },
});

export type StoreState = ReturnType<typeof store.getState>;

interface Props {
  children?: ReactNode;
}

class StoreProvider extends Component<Props> {
  render(): ReactNode {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default StoreProvider;
