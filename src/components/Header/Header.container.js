import { connect } from "react-redux";

import { Header } from "./Header.component";

const mapStateToProps = (state, ownProps) => ({
  categories: state.category.ids,
  activeCategory: state.category.active,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
