import React from "react";

import "./ProductListing.scss";

import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ListingItem } from "./ListingItem";

export class ProductListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: this.props.categoryId,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.loadCategoryProducts();
  }

  componentDidUpdate() {
    if (this.state.categoryId !== this.props.categoryId) {
      this.setState({
        categoryId: this.props.categoryId,
        error: null,
        loading: true,
      });
      this.loadCategoryProducts();
    }
  }

  loadCategoryProducts = () => {
    this.props.setActiveCategory(this.props.categoryId);
    const title =
      this.props.categoryId.charAt(0).toUpperCase() +
      this.props.categoryId.slice(1);

    if (this.props.categoryItems) {
      this.setState({ loading: false });
      document.title = title;
      return;
    }

    this.props
      .getProductsByCategory(this.props.categoryId)
      .then(({ productIds, productItems }) => {
        const id = this.props.categoryId;
        this.props.loadCategory({ id, productIds });
        this.props.loadProductsBasics(productItems);
        this.setState({ loading: false });
        document.title = title;
      })
      .catch((err) => {
        this.setState({ error: err.message });
        document.title = "Not found";
      });
  };

  loadProduct = async (id) => {
    const product = await this.props.getProductById(id);
    this.props.loadProduct(product);
    return product;
  };

  addToCart = async (id) => {
    const product = this.props.products[id].loaded
      ? this.props.products[id]
      : await this.loadProduct(id);

    const attributes = {};
    product.attributes.forEach((attr) => {
      attributes[attr.id] = attr.items[0].id;
    });

    this.props.addToCart({ id, attributes, data: this.props.products[id] });
    this.props.toggleMiniCart(true);
  };

  render() {
    if (this.state.error) {
      return (
        <div className="PageWrapper">
          <div className="PageMainText">{this.state.error}</div>
        </div>
      );
    }

    if (this.state.loading) {
      return (
        <div className="PageWrapper">
          <div className="PageMainText">
            <LoadingSpinner size={60} />
          </div>
        </div>
      );
    }

    if (!this.props.categoryItems) return;

    // sort items by category name
    const items = [...this.props.categoryItems];
    items.sort(
      (a, b) =>
        this.props.products[a].category > this.props.products[b].category
    );

    const title =
      this.state.categoryId.charAt(0).toUpperCase() +
      this.state.categoryId.slice(1);

    return (
      <div className="PageWrapper">
        <div className="CategoryTitle">{title}</div>
        <div className="ListingsGrid">
          {items.map((id) => (
            <ListingItem
              key={id}
              item={this.props.products[id]}
              currency={this.props.currency}
              navigate={this.props.navigate}
              addToCart={this.addToCart}
            />
          ))}
        </div>
      </div>
    );
  }
}
