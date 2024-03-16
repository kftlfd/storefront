import { Component, createRef, ReactNode, RefObject } from 'react';
import styled from 'styled-components';

import { Currency } from '@/api/types';
import chevronIcon from '@/assets/chevron.svg';
import { CartItem } from '@/store/cart';
import { Products } from '@/store/products';
import { formatTotal } from '@/utils/price';

interface Props {
  currencies: Currency[];
  currency: string;
  cart: CartItem[];
  products: Products;
}

interface State {
  open: boolean;
}

export default class OrderSummary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { open: true };
  }

  toggle = () => this.setState((prev) => ({ open: !prev.open }));

  render() {
    const currencyObj = this.props.currencies.find((x) => x.label === this.props.currency);

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
        <Collapse title={'Order Summary'} open={this.state.open} onClick={this.toggle}>
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
            <div>{formatTotal(cartTotal.amount * 0.21, currencyObj!)}</div>
            <div>To pay:</div>
            <div>{formatTotal(cartTotal.amount * 1.21, currencyObj!)}</div>
          </SummaryTotal>
        </Collapse>
      </SummaryWrapper>
    );
  }
}

const SummaryWrapper = styled.div``;

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

interface CollapseProps {
  title: ReactNode;
  open: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

interface CollapseState {
  height: string;
}

class Collapse extends Component<CollapseProps, CollapseState> {
  el: RefObject<HTMLDivElement>;

  constructor(props: CollapseProps) {
    super(props);
    this.el = createRef();
    this.state = { height: 'auto' };
  }

  componentDidMount() {
    const wrapperDiv = this.el.current;
    if (wrapperDiv) {
      this.setState({ height: wrapperDiv.scrollHeight + 'px' });
    }
  }

  render() {
    const elHeight = this.props.open ? this.state.height : '0px';

    return (
      <CollapseContainer>
        <CollapseTitle onClick={this.props.onClick} className={this.props.open ? 'open' : ''}>
          {this.props.title}
          <Chevron src={chevronIcon} $up={this.props.open} />
        </CollapseTitle>
        <CollapseContentWrapper ref={this.el} style={{ height: elHeight }}>
          <CollapseContent>{this.props.children}</CollapseContent>
        </CollapseContentWrapper>
      </CollapseContainer>
    );
  }
}

const CollapseContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.color.accent};
  border-radius: ${({ theme }) => theme.size.borderRadius};
  overflow: hidden;
`;

const CollapseTitle = styled.h3`
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

const Chevron = styled.img<{ $up?: boolean }>`
  height: 1rem;
  filter: ${({ theme }) => theme.img.filter};
  rotate: ${({ $up }) => ($up ? '-180deg' : '')};
  transition: ${({ theme }) => theme.transition.default};
`;

const CollapseContentWrapper = styled.div`
  transition: all 0.6s ease;
  overflow: hidden;
`;

const CollapseContent = styled.div`
  padding: 1rem;
`;
