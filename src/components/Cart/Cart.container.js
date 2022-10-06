import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  increaseQuantity,
  decreaseQuantity,
  toggleMiniCart,
} from "../../store/cart";
import { Cart } from "./Cart.component";

const mapStateToProps = (state, ownProps) => ({
  currencyLabel: state.currency.selected,
  currencyList: state.currency.list,
  cart: state.cart.items,
  products: state.products.items,
  navigate: ownProps.history.push,
});

const mapDispatchToProps = (dispatch) => ({
  increaseQuantity: (index) => dispatch(increaseQuantity(index)),
  decreaseQuantity: (index) => dispatch(decreaseQuantity(index)),
  toggleMiniCart: (payload) => dispatch(toggleMiniCart(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
