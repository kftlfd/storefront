import React from "react";
import { PageContainer, PageMainText } from "../../layout/page";
import CheckoutProgressBar from "./CheckoutProgressBar";
import OrderSummary from "./OrderSummary";
import CheckoutForm from "./CheckoutForm";

import { CHECKOUT } from "./config";

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStepIndex: 0,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  checkoutSteps = [
    {
      id: CHECKOUT.SHIPPING,
      title: "Shipping",
    },
    {
      id: CHECKOUT.BILLING,
      title: "Billing",
    },
    {
      id: CHECKOUT.CONFIRM,
      title: "Confirm",
    },
  ];

  prevStep = () => {
    this.setState((prev) => ({
      currentStepIndex:
        prev.currentStepIndex > 0
          ? prev.currentStepIndex - 1
          : prev.currentStepIndex,
    }));
  };

  nextStep = () => {
    const len = this.checkoutSteps.length;
    this.setState((prev) => ({
      currentStepIndex:
        prev.currentStepIndex < len - 1
          ? prev.currentStepIndex + 1
          : prev.currentStepIndex,
    }));
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
      <PageContainer>
        <CheckoutProgressBar
          steps={this.checkoutSteps}
          current={this.state.currentStepIndex}
        />
        <OrderSummary
          cart={this.props.cart}
          products={this.props.products}
          currencies={this.props.currencyList}
          currency={this.props.currencySelected}
        />
        <CheckoutForm
          steps={this.checkoutSteps}
          current={this.state.currentStepIndex}
          prevStep={this.prevStep}
          nextStep={this.nextStep}
        />
      </PageContainer>
    );
  }
}
