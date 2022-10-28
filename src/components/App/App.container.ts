import { connect, ConnectedProps } from "react-redux";

import type { Product, Category, Currency } from "../../api/types";
import type { StoreState, StoreDispatch } from "../../store";
import { loadCategoriesList } from "../../store/category";
import { loadCurrencies } from "../../store/currency";
import { loadProduct } from "../../store/products";
import { App } from "./App.component";

const mapStateToProps = (state: StoreState) => ({
  categories: state.category.ids,
  currencies: state.currency.list,
  products: state.products.items,
  cart: state.cart.items,
});

const mapDispatchToProps = (dispatch: StoreDispatch) => ({
  loadCategoriesList: (payload: Category[]) =>
    dispatch(loadCategoriesList(payload)),
  loadCurrencies: (payload: Currency[]) => dispatch(loadCurrencies(payload)),
  loadProduct: (payload: Product) => dispatch(loadProduct(payload)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export type StoreProps = ConnectedProps<typeof connector>;

export default connector(App);
