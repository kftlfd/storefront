import { connect } from "react-redux";

import { selectCurrency } from "../../store/currency";
import { Header } from "./Header.component";

const mapStateToProps = (state, ownProps) => ({
  categories: state.category.ids,
  activeCategory: state.category.active,

  currency: state.currency.selected,
  currencyList: state.currency.list,
});

const mapDispatchToProps = (dispatch) => ({
  selectCurrency: (payload) => dispatch(selectCurrency(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
