import React from "react";
import { PageContainer, PageMainText } from "../../layout/page";
import CheckoutForm from "./CheckoutForm";

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStepIndex: 0,
    };
  }

  checkoutSteps = [
    {
      id: "shipping",
      title: "Shipping",
    },
    {
      id: "billing",
      title: "Billing",
    },
    {
      id: "confirm",
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
