import { connect } from "react-redux";

import { getProductsByCategory, getProductById } from "../../api";
import { loadCategory } from "../../store/category";
import { loadProductsBasics, loadProduct } from "../../store/products";
import { addToCart, toggleMiniCart } from "../../store/cart";
import { ProductListing } from "./ProductListing.component";

const mapStateToProps = (state, ownProps) => ({
  currency: state.currency.selected,
  categoryId: ownProps.match.params.categoryId,
  categoryItems: state.category.items[ownProps.match.params.categoryId],
  products: state.products.items,
  navigate: ownProps.history.push,
  getProductsByCategory,
  getProductById,
});

const mapDispatchToProps = (dispatch) => ({
  loadCategory: (payload) => dispatch(loadCategory(payload)),
  loadProductsBasics: (payload) => dispatch(loadProductsBasics(payload)),
  loadProduct: (payload) => dispatch(loadProduct(payload)),
  addToCart: (payload) => dispatch(addToCart(payload)),
  toggleMiniCart: (payload) => dispatch(toggleMiniCart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
