import React from "react";
import styled from "styled-components";
import chevronIcon from "../../assets/chevron.svg";

export default class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  toggle = () => this.setState((prev) => ({ open: !prev.open }));

  render() {
    const currencyObj = this.props.currencies.find(
      (x) => x.label === this.props.currency
    );

    const cartTotal = this.props.cart.reduce(
      (acc, item) => {
        const price = this.props.products[item.id].prices.find(
          (p) => p.currency.label === currencyObj.label
        );
        acc.quantity += item.quantity;
        acc.amount += price.amount * item.quantity;
        return acc;
      },
      { quantity: 0, amount: 0 }
    );

    const summary = {
      description: "Order summary",
      items: this.props.cart,
      total: {
        ...cartTotal,
        tax: cartTotal.amount * 0.21,
        withTax: cartTotal.amount * 1.21,
        currency: currencyObj.label,
      },
    };

    return (
      <SummaryWrapper>
        <Collapse
          title={"Order Summary"}
          open={this.state.open}
          onClick={this.toggle}
        >
          <pre>{JSON.stringify(summary, 2, 2)}</pre>
        </Collapse>
      </SummaryWrapper>
    );
  }
}

const SummaryWrapper = styled.div({
  paddingBlock: "1rem",
});

class Collapse extends React.Component {
  constructor(props) {
    super(props);
    this.el = React.createRef();
    this.state = { height: "auto" };
  }

  componentDidMount() {
    this.setState({ height: this.el.current.scrollHeight + "px" });
  }

  render() {
    const elHeight = this.props.open ? this.state.height : "0px";

    return (
      <CollapseContainer>
        <CollapseTitle
          onClick={this.props.onClick}
          className={this.props.open ? "open" : ""}
        >
          {this.props.title}
          <Chevron src={chevronIcon} up={this.props.open} />
        </CollapseTitle>
        <CollapseContentWrapper ref={this.el} style={{ height: elHeight }}>
          <CollapseContent>{this.props.children}</CollapseContent>
        </CollapseContentWrapper>
      </CollapseContainer>
    );
  }
}

const CollapseContainer = styled.div({
  border: (props) => `2px solid ${props.theme.color.accent}`,
  borderRadius: (props) => props.theme.size.borderRadius,
});

const CollapseTitle = styled.h3({
  display: "block",
  margin: 0,
  padding: "0.8rem 1rem",
  borderRadius: (props) => props.theme.size.borderRadius,
  backgroundColor: (props) => props.theme.color.bg,
  color: (props) => props.theme.color.text,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  transition: (props) => props.theme.transition.default,
  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
});

const Chevron = styled.img({
  height: "1rem",
  filter: (props) => props.theme.img.filter,
  rotate: (props) => (props.up ? "-180deg" : ""),
});

const CollapseContentWrapper = styled.div({
  transition: "all 0.6s ease",
  overflow: "hidden",
});

const CollapseContent = styled.div({
  padding: "1rem",
});
