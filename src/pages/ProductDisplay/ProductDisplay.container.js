import { connect } from "react-redux";

import { getProductById } from "../../api";
import { loadProduct } from "../../store/products";
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);
