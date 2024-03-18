import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { PageContainer, PageMainText } from '@/layout/page';
import { StoreState } from '@/store';
import { emptyCart } from '@/store/cart';

import CheckoutForm from './CheckoutForm';
import CheckoutProgressBar from './CheckoutProgressBar';
import { CheckoutStep } from './config';
import OrderSummary from './OrderSummary';

const withStore = connect(
  (state: StoreState) => ({
    cart: state.cart.items,
    products: state.products.items,
    currencyList: state.currency.list,
    currencySelected: state.currency.selected,
  }),
  {
    emptyCart,
  },
);

type StoreProps = ConnectedProps<typeof withStore>;

interface Props extends StoreProps, RouteComponentProps {}

interface State {
  currentStepIndex: number;
}

class Checkout extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentStepIndex: 0,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  checkoutSteps: { id: CheckoutStep; title: string }[] = [
    {
      id: CheckoutStep.Shipping,
      title: 'Shipping',
    },
    {
      id: CheckoutStep.Billing,
      title: 'Billing',
    },
    {
      id: CheckoutStep.Confirm,
      title: 'Confirm',
    },
  ];

  prevStep = () => {
    this.setState((prev) => ({
      currentStepIndex:
        prev.currentStepIndex > 0 ? prev.currentStepIndex - 1 : prev.currentStepIndex,
    }));
  };

  nextStep = () => {
    const len = this.checkoutSteps.length;
    this.setState((prev) => ({
      currentStepIndex:
        prev.currentStepIndex < len - 1 ? prev.currentStepIndex + 1 : prev.currentStepIndex,
    }));
  };

  onConfirm = () => {
    window.alert('Thanks for shopping at eStore!');
    this.props.emptyCart();
    this.props.history.push('/');
  };

  renderEmpty() {
    return (
      <PageContainer>
        <PageMainText>Cart is empty. Nothing to Checkout</PageMainText>
      </PageContainer>
    );
  }

  render() {
    if (this.props.cart.length < 1) return this.renderEmpty();

    return (
      <CheckoutContainer>
        <CheckoutProgressBar steps={this.checkoutSteps} current={this.state.currentStepIndex} />
        <OrderSummary
          cart={this.props.cart}
          products={this.props.products}
          currencies={this.props.currencyList}
          currency={this.props.currencySelected ?? ''}
        />
        <CheckoutForm
          steps={this.checkoutSteps}
          current={this.state.currentStepIndex}
          prevStep={this.prevStep}
          nextStep={this.nextStep}
          onConfirm={this.onConfirm}
        />
      </CheckoutContainer>
    );
  }
}

export default withRouter(withStore(Checkout));

const CheckoutContainer = styled(PageContainer)({
  paddingBottom: '3rem',
  display: 'grid',
  rowGap: '1rem',

  '@media (min-width: 800px)': {
    gridTemplateColumns: '3fr 2fr',
    gridTemplateRows: 'max-content max-content',
    columnGap: '3rem',

    '& > :nth-child(1)': { gridColumnStart: 1, gridColumnEnd: 'span 2' },
    '& > :nth-child(2)': { gridRow: 2, gridColumn: 2 },
    '& > :nth-child(3)': { gridRow: 2, gridColumn: 1 },
  },
});
