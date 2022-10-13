import { connect } from "react-redux";
import Checkout from "./Checkout.component";

const mapStateToProps = (state) => ({
  cart: state.cart.items,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
