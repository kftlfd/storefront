import { connect } from "react-redux";

import { selectCurrency } from "../../store/currency";
import { toggleMiniCart } from "../../store/cart";
import { Header } from "./Header.component";

const mapStateToProps = (state, ownProps) => ({
  categories: state.category.ids,
  activeCategory: state.category.active,

  currency: state.currency.selected,
  currencyList: state.currency.list,

  cart: state.cart.items,
  miniCartOpen: state.cart.miniCartOpen,
});

const mapDispatchToProps = (dispatch) => ({
  selectCurrency: (payload) => dispatch(selectCurrency(payload)),
  toggleMiniCart: (payload) => dispatch(toggleMiniCart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
