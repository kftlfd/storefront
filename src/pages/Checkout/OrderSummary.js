import React from "react";
import styled from "styled-components";
import chevronIcon from "../../assets/chevron.svg";
import { formatTotal } from "../../utils/price";

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

    return (
      <SummaryWrapper>
        <Collapse
          title={"Order Summary"}
          open={this.state.open}
          onClick={this.toggle}
        >
          {this.props.cart.map((cartItem, index) => {
            const p = this.props.products[cartItem.id];
            return (
              <SummaryItem key={cartItem.id + index}>
                <ItemQuantity>
                  <b>{cartItem.quantity}</b> &times;
                </ItemQuantity>
                <ItemDetails>
                  <div>
                    <b>{`${p.brand} ${p.name}`}</b>
                  </div>
                  {Object.keys(cartItem.attributes).map((attrId) => (
                    <div key={attrId}>
                      {attrId}: <b>{cartItem.attributes[attrId]}</b>
                    </div>
                  ))}
                </ItemDetails>
                <ItemImage src={p.gallery[0]} />
              </SummaryItem>
            );
          })}
          <SummaryTotal>
            <div>Tax 21%:</div>
            <div>{formatTotal(cartTotal.amount * 0.21, currencyObj)}</div>
            <div>To pay:</div>
            <div>{formatTotal(cartTotal.amount * 1.21, currencyObj)}</div>
          </SummaryTotal>
        </Collapse>
      </SummaryWrapper>
    );
  }
}

const SummaryWrapper = styled.div({});

const SummaryItem = styled.div({
  display: "flex",
  gap: "0.5rem",
  marginBottom: "1.5rem",
});
const ItemQuantity = styled.div({ flexShrink: 0 });
const ItemDetails = styled.div({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  gap: "0.3rem",
});
const ItemImage = styled.img({
  borderRadius: (props) => props.theme.size.borderRadius,
  maxHeight: "100px",
  maxWidth: "160px",
});

const SummaryTotal = styled.div({
  display: "grid",
  gridTemplateColumns: "max-content auto",
  rowGap: "1rem",
  columnGap: "1.5rem",

  "& > :nth-child(2)": { fontWeight: 500 },
  "& > :nth-child(3), & > :nth-child(4)": {
    fontSize: "1.2rem",
    fontWeight: 700,
  },
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
  overflow: "hidden",
});

const CollapseTitle = styled.h3({
  display: "block",
  margin: 0,
  padding: "0.8rem 1rem",
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
  transition: (props) => props.theme.transition.default,
});

const CollapseContentWrapper = styled.div({
  transition: "all 0.6s ease",
  overflow: "hidden",
});

const CollapseContent = styled.div({
  padding: "1rem",
});
