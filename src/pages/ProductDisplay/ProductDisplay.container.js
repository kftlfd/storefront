import { connect } from "react-redux";

import { getProductById } from "../../api";
import { loadProduct } from "../../store/products";
import { setActiveCategory } from "../../store/category";
import { addToCart, toggleMiniCart } from "../../store/cart";
import { ProductDisplay } from "./ProductDisplay.component";

const mapStateToProps = (state, ownProps) => ({
  currency: state.currency.selected,
  productId: ownProps.match.params.productId,
  product: state.products.items[ownProps.match.params.productId],
  getProductById,
});

const mapDispatchToProps = (dispatch) => ({
  loadProduct: (payload) => dispatch(loadProduct(payload)),
  addToCart: (payload) => dispatch(addToCart(payload)),
  toggleMiniCart: (val) => dispatch(toggleMiniCart(val)),
  setActiveCategory: (payload) => dispatch(setActiveCategory(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);
