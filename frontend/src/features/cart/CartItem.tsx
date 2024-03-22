import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import { getProductById } from '@/api';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { StoreState } from '@/store';
import { CartItem as CartItemType } from '@/store/cart';
import { loadProduct } from '@/store/products';
import { getDefaultAttributes } from '@/utils/defaultAttributes';

import CartItemView from './CartItemView';

const withStore = connect(
  (state: StoreState) => ({
    products: state.products.products,
    currency: state.settings.selectedCurrency,
  }),
  { loadProduct },
);

type StoreProps = ConnectedProps<typeof withStore>;

interface Props extends StoreProps {
  item: CartItemType;
  onUpdate: (item: CartItemType) => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  closeCart: () => void;
  mini?: boolean;
}

interface State {
  loading: boolean;
  error: string | null;
}

class CartItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { item, products } = this.props;

    this.state = {
      loading: !products[item.id]?.loaded,
      error: null,
    };
  }

  componentDidMount(): void {
    this.prepareItem()
      .then(() => {
        this.setState({ loading: false });
      })
      .catch((e) => {
        this.setState({ error: e instanceof Error ? e.message : 'Error' });
      });
  }

  prepareItem = async () => {
    const { item, products, onUpdate } = this.props;

    if (item.attributesSelected) {
      return;
    }

    const inStore = products[item.id];
    const product = inStore?.loaded ? inStore : await this.loadProduct(item.id);

    onUpdate({
      ...item,
      attributes: getDefaultAttributes(product.attributes ?? []),
      attributesSelected: true,
    });
  };

  loadProduct = async (id: string) => {
    const product = await getProductById(id);
    this.props.loadProduct(product);
    return product;
  };

  render() {
    const { loading, error } = this.state;
    const { item, products, currency, closeCart, decreaseQuantity, increaseQuantity, mini } =
      this.props;

    const product = products[item.id];

    return loading ? (
      <Placeholder>
        <LoadingSpinner />
      </Placeholder>
    ) : error || !product ? (
      <Placeholder>Error</Placeholder>
    ) : (
      <CartItemView
        item={item}
        product={product}
        currency={currency}
        closeCart={closeCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        mini={mini}
      />
    );
  }
}

export default withStore(CartItem);

const Placeholder = styled.div`
  padding-block: 1rem;
  display: flex;
  justify-content: center;
`;
