import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { links } from "../../components/Router";

import "./ProductDisplay.scss";

import { PageContainer, PageMainText } from "../../layout/page";
import { ProductAttributes } from "../../components/ProductAttributes";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { AccentButton } from "../../components/Button";
import { ProductGallery } from "./ProductGallery";
import { ProductPrice } from "./ProductPrice";
import { ProductDescription } from "./ProductDescription";

export class ProductDisplay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      selectedAttrs: {},
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.prepareProduct();
  }

  loadProduct = async () => {
    if (this.props.product && this.props.product.loaded) {
      return this.props.product;
    }
    try {
      const product = await this.props.getProductById(
        this.props.match.params.productId
      );
      this.props.loadProduct(product);
      return product;
    } catch (err) {
      this.setState({ error: err.message });
      document.title = "Not found";
      return null;
    }
  };

  prepareProduct = async () => {
    const product = await this.loadProduct();
    if (!product) return;

    const selectedAttrs = {};
    const attributes = product.attributes || [];
    attributes.forEach((attr) => (selectedAttrs[attr.id] = attr.items[0].id));

    this.setState({ loading: false, selectedAttrs });
    document.title = product.name;
  };

  selectAttr = (attrId, valId) => {
    this.setState((prev) => ({
      ...prev,
      selectedAttrs: { ...prev.selectedAttrs, [attrId]: valId },
    }));
  };

  addToCart = () => {
    this.props.addToCart({
      id: this.props.product.id,
      attributes: this.state.selectedAttrs,
      data: this.props.product,
    });
    this.props.toggleMiniCart(true);
  };

  render() {
    if (this.state.error) {
      return (
        <PageContainer>
          <PageMainText>{this.state.error}</PageMainText>
        </PageContainer>
      );
    }

    if (this.state.loading) {
      return (
        <PageContainer>
          <PageMainText>
            <LoadingSpinner size={60} />
          </PageMainText>
        </PageContainer>
      );
    }

    const product = this.props.product;

    return (
      <PageContainer>
        <div className="ProductDisplayContainer">
          <ProductGallery gallery={product.gallery} name={product.name} />

          <div className="ProductInfo">
            <div className="category">
              Category:{" "}
              <CategoryLink to={links.category(product.category)}>
                {product.category[0].toUpperCase() + product.category.slice(1)}
              </CategoryLink>
            </div>
            <div className="brand">{product.brand}</div>
            <div className="name">{product.name}</div>
            {product.attributes.length > 0 && (
              <ProductAttributes
                attributes={product.attributes}
                selected={this.state.selectedAttrs}
                selectAttr={this.selectAttr}
              />
            )}
            <ProductPrice
              currency={this.props.currency}
              prices={product.prices}
            />
            {product.inStock && (
              <AccentButton
                big={true}
                biggerFont={true}
                onClick={this.addToCart}
              >
                Add to cart
              </AccentButton>
            )}
            <ProductDescription html={product.description} />
          </div>
        </div>
      </PageContainer>
    );
  }
}

const CategoryLink = styled(Link)({
  fontWeight: 500,
  color: (props) => props.theme.color.text,
  textDecoration: "none",
  ":visited": {
    color: (props) => props.theme.color.text,
  },
  ":hover": {
    textDecoration: "underline",
  },
});
