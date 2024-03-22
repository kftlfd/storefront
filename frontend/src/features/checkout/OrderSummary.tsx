import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import ChevronIcon from '@/assets/chevron.svg?react';
import Collapse from '@/components/Collapse';
import { StoreState } from '@/store';
import { formatTotal } from '@/utils/price';

const withStore = connect((state: StoreState) => ({
  cart: state.cart.items,
  currency: state.settings.selectedCurrency,
  products: state.products.products,
}));

type StoreProps = ConnectedProps<typeof withStore>;

interface State {
  open: boolean;
}

class OrderSummary extends Component<StoreProps, State> {
  constructor(props: StoreProps) {
    super(props);
    this.state = { open: true };
  }

  toggle = () => this.setState((prev) => ({ open: !prev.open }));

  render() {
    const currencyObj = this.props.currency;

    const cartTotal = this.props.cart.reduce(
      (acc, item) => {
        const price = this.props.products[item.id]?.prices.find(
          (p) => p.currency.label === currencyObj?.label,
        );
        acc.quantity += item.quantity;
        acc.amount += (price?.amount ?? 0) * item.quantity;
        return acc;
      },
      { quantity: 0, amount: 0 },
    );

    return (
      <SummaryWrapper>
        <Title onClick={this.toggle} className={this.state.open ? 'open' : ''}>
          <span>Order Summary</span>
          <Chevron style={{ rotate: this.state.open ? '-180deg' : '0deg' }} />
        </Title>

        <Collapse open={this.state.open}>
          <CollapseContent>
            {this.props.cart.map((cartItem, index) => {
              const p = this.props.products[cartItem.id]!;
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
          </CollapseContent>
        </Collapse>
      </SummaryWrapper>
    );
  }
}

export default withStore(OrderSummary);

const SummaryWrapper = styled.div`
  border: 2px solid ${({ theme }) => theme.color.accent};
  border-radius: ${({ theme }) => theme.size.borderRadius};
`;

const SummaryItem = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;
const ItemQuantity = styled.div`
  flex-shrink: 0;
`;
const ItemDetails = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const ItemImage = styled.img`
  border-radius: ${({ theme }) => theme.size.borderRadius};
  max-height: 100px;
  max-width: 160px;
`;

const SummaryTotal = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  row-gap: 1rem;
  column-gap: 1.5rem;

  & > :nth-child(2) {
    font-weight: 500;
  }
  & > :nth-child(3),
  & > :nth-child(4) {
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

const Title = styled.h3`
  margin: 0;
  padding: 0.8rem 1rem;
  background-color: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.default};

  &:hover {
    background-color: ${({ theme }) => theme.color.bgHover};
  }
`;

const Chevron = styled(ChevronIcon)`
  height: 1rem;
  fill: ${({ theme }) => theme.color.text};
  transition: ${({ theme }) => theme.transition.default};
`;

const CollapseContent = styled.div`
  padding: 1rem;
`;
