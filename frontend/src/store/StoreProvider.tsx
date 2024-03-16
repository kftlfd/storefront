import { Component, ReactNode } from 'react';
import { Provider } from 'react-redux';

import store from '@/store';

interface Props {
  children?: ReactNode;
}

class StoreProvider extends Component<Props> {
  render(): ReactNode {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default StoreProvider;
