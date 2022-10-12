import React from "react";
import styled from "styled-components";

export class CartContent extends React.Component {
  constructor(props) {
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
      this.cartContentRef.current.addEventListener(
        "scroll",
        this.updateShadows
      );
    }
  }

  componentWillUnmount() {
    if (this.props.mini) {
      this.cartContentRef.current.removeEventListener(
        "scroll",
        this.updateShadows
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.updateShadows();
    }
    if (prevProps.children.length < this.props.children.length) {
      this.cartContentRef.current.scroll(
        0,
        this.cartContentRef.current.scrollHeight
      );
    }
  }

  updateShadows = () => {
    this.setState({
      showTopShadow: this.cartContentRef.current.scrollTop > 0,
      showBottomShadow:
        this.cartContentRef.current.scrollTop + 2 <
        this.cartContentRef.current.scrollHeight -
          this.cartContentRef.current.offsetHeight,
    });
  };

  render() {
    return (
      <CartContentContainer
        mini={this.props.mini}
        ref={this.cartContentRef}
        showTopShadow={this.state.showTopShadow}
        showBottomShadow={this.state.showBottomShadow}
      >
        {this.props.children}
      </CartContentContainer>
    );
  }
}

const CartContentContainer = styled.div({
  overflowY: (props) => (props.mini ? "auto" : "hidden"),
  position: "relative",
  scrollbarWidth: "thin",
  scrollbarColor: "#ccc #fff",

  "&::before, &::after": {
    display: "block",
    content: "''",
    position: "sticky",
    left: 0,
    right: 0,
    zIndex: 10,
  },
  "&::before": {
    top: 0,
    boxShadow: (props) =>
      props.showTopShadow ? props.theme.shadow.darker : "",
  },
  "&::after": {
    bottom: 0,
    boxShadow: (props) =>
      props.showBottomShadow ? props.theme.shadow.darker : "",
  },

  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#ccc",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#999",
  },
});
