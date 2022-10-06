import { connect } from "react-redux";

import { getCategoriesAndCurrencies, getProductsByIds } from "../../api";
import { loadCategoriesList } from "../../store/category";
import { loadCurrencies } from "../../store/currency";
import { loadProduct } from "../../store/products";
import { App } from "./App.component";

const mapStateToProps = (state) => ({
  categories: state.category.ids,
  currencies: state.currency.list,
  products: state.products.items,
  cart: state.cart.items,
  defCategory: state.category.ids[0],
  getCategoriesAndCurrencies,
  getProductsByIds,
});

const mapDispatchToProps = (dispatch) => ({
  loadCategoriesList: (payload) => dispatch(loadCategoriesList(payload)),
  loadCurrencies: (payload) => dispatch(loadCurrencies(payload)),
  loadProduct: (payload) => dispatch(loadProduct(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
