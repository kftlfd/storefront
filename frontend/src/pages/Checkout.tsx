import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import CheckoutForm from '@/features/checkout/CheckoutForm';
import CheckoutProgressBar from '@/features/checkout/CheckoutProgressBar';
import { CheckoutStep } from '@/features/checkout/config';
import OrderSummary from '@/features/checkout/OrderSummary';
import { PageContainer, PageMainText } from '@/layout/page';
import { StoreState } from '@/store';
import { emptyCart } from '@/store/cart';

const checkoutSteps: { id: CheckoutStep; title: string }[] = [
  { id: CheckoutStep.Shipping, title: 'Shipping' },
  { id: CheckoutStep.Billing, title: 'Billing' },
  { id: CheckoutStep.Confirm, title: 'Confirm' },
];

const withStore = connect(
  (state: StoreState) => ({
    cart: state.cart.items,
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

class CheckoutPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { currentStepIndex: 0 };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  prevStep = () => {
    this.setState((prev) => ({
      currentStepIndex: Math.max(prev.currentStepIndex - 1, 0),
    }));
  };

  nextStep = () => {
    this.setState((prev) => ({
      currentStepIndex: Math.min(prev.currentStepIndex + 1, checkoutSteps.length - 1),
    }));
  };

  onConfirm = () => {
    window.alert('Thanks for shopping at eStore!');
    this.props.emptyCart();
    this.props.history.push('/');
  };

  render() {
    if (this.props.cart.length < 1) {
      return (
        <PageContainer>
          <PageMainText>Cart is empty. Nothing to Checkout</PageMainText>
        </PageContainer>
      );
    }

    return (
      <CheckoutContainer>
        <CheckoutProgressBar steps={checkoutSteps} current={this.state.currentStepIndex} />
        <div>
          <OrderSummary />
        </div>
        <CheckoutForm
          steps={checkoutSteps}
          current={this.state.currentStepIndex}
          prevStep={this.prevStep}
          nextStep={this.nextStep}
          onConfirm={this.onConfirm}
        />
      </CheckoutContainer>
    );
  }
}

export default withRouter(withStore(CheckoutPage));

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
