import { connect } from "react-redux";
import Checkout from "./Checkout.component";

const mapStateToProps = (state) => ({
  cart: state.cart.items,
  products: state.products.items,
  currencyList: state.currency.list,
  currencySelected: state.currency.selected,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
