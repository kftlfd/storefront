import React, { Component, ReactNode, RefObject } from 'react';
import styled from 'styled-components';

interface Props {
  mini?: boolean;
  children?: ReactNode;
}

interface State {
  showTopShadow: boolean;
  showBottomShadow: boolean;
}

class CartContent extends Component<Props, State> {
  cartContentRef: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.cartContentRef = React.createRef();
    this.state = {
      showTopShadow: false,
      showBottomShadow: false,
    };
  }

  componentDidMount() {
    if (this.props.mini) {
      this.updateShadows();
      this.cartContentRef.current?.addEventListener('scroll', this.updateShadows);
    }
  }

  componentWillUnmount() {
    if (this.props.mini) {
      this.cartContentRef.current?.removeEventListener('scroll', this.updateShadows);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.children !== this.props.children) {
      this.updateShadows();
    }
    // @ts-expect-error can't think of how to type it
    if (prevProps.children.length < this.props.children.length) {
      this.cartContentRef.current?.scroll(0, this.cartContentRef.current.scrollHeight);
    }
  }

  updateShadows = () => {
    if (!this.cartContentRef.current) return;

    this.setState({
      showTopShadow: (this.cartContentRef.current.scrollTop ?? 0) > 0,
      showBottomShadow:
        this.cartContentRef.current.scrollTop + 2 <
        this.cartContentRef.current.scrollHeight - this.cartContentRef.current.offsetHeight,
    });
  };

  render() {
    return (
      <CartContentContainer
        ref={this.cartContentRef}
        $mini={this.props.mini}
        $showTopShadow={this.state.showTopShadow}
        $showBottomShadow={this.state.showBottomShadow}
      >
        {this.props.children}
      </CartContentContainer>
    );
  }
}

export default CartContent;

const CartContentContainer = styled.div<{
  $mini?: boolean;
  $showTopShadow?: boolean;
  $showBottomShadow?: boolean;
}>`
  overflow-y: ${({ $mini }) => ($mini ? 'auto' : 'hidden')};
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: #ccc #fff;

  &::before,
  &::after {
    display: block;
    content: '';
    position: sticky;
    left: 0;
    right: 0;
    z-index: 10;
  }
  &::before {
    top: 0;
    box-shadow: ${({ theme, $showTopShadow }) => ($showTopShadow ? theme.shadow.darker : '')};
  }
  &::after {
    bottom: 0;
    box-shadow: ${({ theme, $showBottomShadow }) => ($showBottomShadow ? theme.shadow.darker : '')};
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.bgHover};
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #777;
  }
`;
