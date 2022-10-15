import React from "react";
import { Link } from "react-router-dom";

import { LoadingSpinner } from "../../components/LoadingSpinner";
import { SortDropdown } from "./SortDropdown";
import { ListingItem } from "./ListingItem";

import { PageContainer, PageMainText } from "../../layout/page";
import {
  CategoryHeader,
  CategoryTitle,
  CategorySorting,
  SortingLabel,
  Button,
  ButtonIcon,
  ListingsGrid,
} from "./ProductListing.ui";
import chevronIcon from "../../assets/chevron.svg";

const ITEMS_ON_PAGE = 8;

function getPage(s) {
  let start = s.search("p=");
  if (start < 0) return 0;
  start += 2;
  let end = s.indexOf(";", start);
  if (end < 0) end = s.length;
  let page = s.slice(start, end);
  if (!page) return 0;
  return parseInt(page);
}

export class ProductListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      sortBy: null,
      sortAsc: true,
    };
  }

  componentDidMount() {
    this.loadCategoryProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categoryId !== this.props.categoryId) {
      this.setState({
        error: null,
        loading: true,
      });
      this.loadCategoryProducts();
      window.scrollTo(0, 0);
    }
  }

  loadCategoryProducts = () => {
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

  toggleSortOrder = () => {
    this.setState((prev) => ({ sortAsc: !prev.sortAsc }));
  };

  sortOptions = [
    {
      id: "category",
      f: () => this.setState({ sortBy: "category" }),
    },
    {
      id: "name",
      f: () => this.setState({ sortBy: "name" }),
    },
    {
      id: "brand",
      f: () => this.setState({ sortBy: "brand" }),
    },
    {
      id: "price",
      f: () => this.setState({ sortBy: "price" }),
    },
    {
      id: "inStock",
      f: () => this.setState({ sortBy: "inStock" }),
    },
  ];

  sortOptionsTitles = {
    category: "Category",
    name: "Name",
    brand: "Brand",
    price: "Price",
    inStock: "In Stock",
  };

  sortingFunctions = {
    string: (a, b) => {
      let s1 = this.props.products[a][this.state.sortBy].toLowerCase();
      let s2 = this.props.products[b][this.state.sortBy].toLowerCase();
      if (s1 === s2) return 0;
      return s1 > s2 ? 1 : -1;
    },

    price: (a, b) =>
      this.props.products[a].prices[0].amount -
      this.props.products[b].prices[0].amount,

    inStock: (a, b) =>
      this.props.products[a].inStock - this.props.products[b].inStock,
  };

  sortByFunctions = {
    name: this.sortingFunctions.string,
    brand: this.sortingFunctions.string,
    category: this.sortingFunctions.string,
    price: this.sortingFunctions.price,
    inStock: this.sortingFunctions.inStock,
  };

  renderError = () => (
    <PageContainer>
      <PageMainText>{/*this.state.error*/}Page not found</PageMainText>
    </PageContainer>
  );

  renderLoading = () => (
    <PageContainer>
      <PageMainText>
        <LoadingSpinner size={60} />
      </PageMainText>
    </PageContainer>
  );

  renderCategoryHeader = () => (
    <CategoryHeader>
      <CategoryTitle>
        {this.props.categoryId.charAt(0).toUpperCase() +
          this.props.categoryId.slice(1)}
      </CategoryTitle>

      <CategorySorting>
        <SortingLabel>Sort by</SortingLabel>
        <SortDropdown
          sortBy={this.state.sortBy}
          sortOptions={this.sortOptions}
          sortTitles={this.sortOptionsTitles}
        />
        <Button onClick={this.toggleSortOrder}>
          <ButtonIcon src={chevronIcon} up={this.state.sortAsc} />
        </Button>
      </CategorySorting>
    </CategoryHeader>
  );

  scrollToTop = () => window.scrollTo(0, 0);

  renderListingsGrid = () => {
    let items = [...(this.props.categoryItems || [])];

    if (this.state.sortBy) items.sort(this.sortByFunctions[this.state.sortBy]);

    if (!this.state.sortAsc) items.reverse();

    const needPagination = items.length > ITEMS_ON_PAGE;

    const page = getPage(this.props.location.search);
    const currentPage = page > 0 ? page : 1;
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < Math.ceil(items.length / ITEMS_ON_PAGE);

    if (needPagination) {
      const p = page > 0 ? page - 1 : page;
      const start = p * ITEMS_ON_PAGE;
      const end = start + ITEMS_ON_PAGE;
      items = items.slice(start, end);
    }

    return (
      <>
        <ListingsGrid>
          {items.map((id) => (
            <ListingItem
              key={id}
              item={this.props.products[id]}
              currency={this.props.currency}
              navigate={this.props.navigate}
              addToCart={this.addToCart}
            />
          ))}
        </ListingsGrid>

        {needPagination && (
          <Pagination>
            {hasPrev && (
              <div onClick={this.scrollToTop}>
                <PaginationBtn to={`?p=${currentPage - 1}`}>
                  <PageArrow src={chevronIcon} />
                </PaginationBtn>
              </div>
            )}
            <div onClick={this.scrollToTop}>
              <PaginationBtn to={"?p=" + currentPage}>
                {currentPage}
              </PaginationBtn>
            </div>
            {hasNext && (
              <div onClick={this.scrollToTop}>
                <PaginationBtn to={`?p=${currentPage + 1}`}>
                  <PageArrow src={chevronIcon} right={true} />
                </PaginationBtn>
              </div>
            )}
          </Pagination>
        )}
      </>
    );
  };

  render() {
    if (this.state.error) return this.renderError();
    if (this.state.loading) return this.renderLoading();

    return (
      <PageContainer id="listings">
        {this.renderCategoryHeader()}
        {this.renderListingsGrid()}
      </PageContainer>
    );
  }
}

import styled from "styled-components";
const Pagination = styled.div({
  paddingBottom: "4rem",
  display: "flex",
  justifyContent: "center",
  gap: "0.5rem",
});
const PaginationBtn = styled(Link)({
  padding: 0,
  height: "2rem",
  aspectRatio: "1",
  backgroundColor: (props) => props.theme.color.bgButton,
  borderRadius: (props) => props.theme.size.borderRadius,
  border: "none",
  display: "grid",
  placeContent: "center",
  fontFamily: "inherit",
  fontSize: "1rem",
  fontWeight: 400,
  textDecoration: "none",
  color: (props) => props.theme.color.text,
  cursor: "pointer",
  transition: (props) => props.theme.transition.default,
  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
});
const PageArrow = styled.img({
  height: "1rem",
  filter: (props) => props.theme.img.filter,
  rotate: (props) => (props.right ? "-90deg" : "90deg"),
});
