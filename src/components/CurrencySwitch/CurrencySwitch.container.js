import { connect } from "react-redux";
import { selectCurrency } from "../../store/currency";
import { CurrencySwitch } from "./CurrencySwitch.component";

const mapStateToProps = (state) => ({
  currency: state.currency.selected,
  currencyList: state.currency.list,
});

const mapDispatchToProps = (dispatch) => ({
  selectCurrency: (payload) => dispatch(selectCurrency(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitch);
