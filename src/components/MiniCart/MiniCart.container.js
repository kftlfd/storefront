import { connect } from "react-redux";
import { toggleMiniCart } from "../../store/cart";
import { MiniCart } from "./MiniCart.component";

const mapStateToProps = (state) => ({
  cart: state.cart.items,
  miniCartOpen: state.cart.miniCartOpen,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMiniCart: (payload) => dispatch(toggleMiniCart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
