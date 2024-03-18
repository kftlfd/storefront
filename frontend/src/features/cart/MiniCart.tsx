import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled, { css } from 'styled-components';

import CartIcon from '@/assets/cart.svg?react';
import { HeaderButton, HeaderButtonBackdrop, HeaderButtonContainer } from '@/layout/header';
import { hideable } from '@/layout/hideable';
import { StoreState } from '@/store';
import { toggleMiniCart } from '@/store/cart';

import Cart from './Cart';

const withStore = connect(
  (state: StoreState) => ({
    cart: state.cart.items,
    miniCartOpen: state.cart.miniCartOpen,
  }),
  {
    toggleMiniCart,
  },
);

type StoreProps = ConnectedProps<typeof withStore>;

class MiniCart extends Component<StoreProps> {
  toggleMiniCart = () => this.props.toggleMiniCart();

  closeMiniCart = () => this.props.toggleMiniCart(false);

  getCartCount = () => this.props.cart.reduce((prev, x) => (prev += x.quantity), 0);

  render() {
    const cartCount = this.getCartCount();

    return (
      <>
        <HeaderButtonContainer zIndex={61}>
          <HeaderButton
            onClick={this.toggleMiniCart}
            className={this.props.miniCartOpen ? 'active' : ''}
          >
            <IconContainer>
              <StyledCartIcon />
              {cartCount > 0 && <Badge>{cartCount}</Badge>}
            </IconContainer>
          </HeaderButton>

          <MiniCartMenu className={this.props.miniCartOpen ? 'show' : ''}>
            {this.props.cart.length > 0 ? <Cart mini /> : <EmptyCart>Cart is empty</EmptyCart>}
          </MiniCartMenu>
        </HeaderButtonContainer>

        <HeaderButtonBackdrop
          zIndex={60}
          className={this.props.miniCartOpen ? 'show' : ''}
          onClick={this.closeMiniCart}
        >
          <BackdropTop />
          <BackdropBottom />
        </HeaderButtonBackdrop>
      </>
    );
  }
}

export default withStore(MiniCart);

const IconContainer = styled.div({
  position: 'relative',
});

const StyledCartIcon = styled(CartIcon)`
  height: 1rem;
  fill: ${({ theme }) => theme.color.text};
  transition: ${({ theme }) => theme.transition.default};
`;

const Badge = styled.div`
  position: absolute;
  bottom: 60%;
  left: 60%;
  height: 1rem;
  min-width: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.color.text};
  color: ${({ theme }) => theme.color.bg};
  transition: ${({ theme }) => theme.transition.default};

  padding-inline: 0.2rem;
  font-family: Arial, sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  display: grid;
  place-content: center;
`;

const MiniCartMenu = styled.div(
  ({ theme }) => css`
    padding-block: 1rem;
    position: absolute;
    top: calc(100% + ${theme.size.headerBtnSpacing} + 0.5rem);
    border-radius: ${theme.size.borderRadius};
    right: 0;
    min-width: 350px;
    max-height: calc(100vh - ${theme.size.headerHeight} - 1rem);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    overflow-y: hidden;
    background-color: ${theme.color.bg};
    ${hideable}
  `,
);

const EmptyCart = styled.div`
  padding-block: 2rem;
  text-align: center;
`;

const BackdropTop = styled.div`
  height: ${({ theme }) => theme.size.headerHeight};
`;

const BackdropBottom = styled.div`
  height: calc(100vh - ${({ theme }) => theme.size.headerHeight});
  background-color: ${({ theme }) => theme.color.backdrop};
`;
