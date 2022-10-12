import React from "react";

import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ListingItem } from "./ListingItem";

import { PageContainer, PageMainText } from "../../layout/page";
import {
  CategoryHeader,
  CategoryTitle,
  CategorySorting,
  SortingLabel,
  DropdownContainer,
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuBackdrop,
  Button,
  ButtonIcon,
  ListingsGrid,
} from "./ProductListing.ui";
import chevronIcon from "../../assets/chevron.svg";

export class ProductListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,

      sortDropdownOpen: false,
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

  toggleSortDropdown = () => {
    this.setState((prev) => ({ sortDropdownOpen: !prev.sortDropdownOpen }));
  };

  closeSortDropdown = () => {
    this.setState({ sortDropdownOpen: false });
  };

  toggleSortOrder = () => {
    this.setState((prev) => ({ sortAsc: !prev.sortAsc }));
  };

  sortOptions = [
    {
      id: "category",
      f: () => this.setState({ sortBy: "category", sortDropdownOpen: false }),
    },
    {
      id: "name",
      f: () => this.setState({ sortBy: "name", sortDropdownOpen: false }),
    },
    {
      id: "brand",
      f: () => this.setState({ sortBy: "brand", sortDropdownOpen: false }),
    },
    {
      id: "price",
      f: () => this.setState({ sortBy: "price", sortDropdownOpen: false }),
    },
    {
      id: "inStock",
      f: () => this.setState({ sortBy: "inStock", sortDropdownOpen: false }),
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
    string: (a, b) =>
      this.props.products[a][this.state.sortBy].toLowerCase() >
      this.props.products[b][this.state.sortBy].toLowerCase(),

    price: (a, b) =>
      this.props.products[a].prices[0].amount >
      this.props.products[b].prices[0].amount,

    inStock: (a, b) =>
      this.props.products[a].inStock < this.props.products[b].inStock,
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
      <PageMainText>{this.state.error}</PageMainText>
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

        <DropdownContainer>
          <Button onClick={this.toggleSortDropdown}>
            {this.state.sortBy
              ? this.sortOptionsTitles[this.state.sortBy]
              : "None"}
          </Button>

          <DropdownMenu className={this.state.sortDropdownOpen ? "show" : ""}>
            {this.sortOptions.map(({ id, f }) => (
              <DropdownMenuButton
                key={id}
                onClick={f}
                className={this.state.sortBy === id ? "selected" : ""}
              >
                {this.sortOptionsTitles[id]}
              </DropdownMenuButton>
            ))}
          </DropdownMenu>

          <DropdownMenuBackdrop
            show={this.state.sortDropdownOpen}
            onClick={this.closeSortDropdown}
          />
        </DropdownContainer>

        <Button onClick={this.toggleSortOrder}>
          <ButtonIcon src={chevronIcon} up={this.state.sortAsc} />
        </Button>
      </CategorySorting>
    </CategoryHeader>
  );

  renderListingsGrid = () => {
    const items = [...(this.props.categoryItems || [])];

    if (this.state.sortBy) items.sort(this.sortByFunctions[this.state.sortBy]);

    if (!this.state.sortAsc) items.reverse();

    return (
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
    );
  };

  render() {
    if (this.state.error) return this.renderError();
    if (this.state.loading) return this.renderLoading();

    return (
      <PageContainer>
        {this.renderCategoryHeader()}
        {this.renderListingsGrid()}
      </PageContainer>
    );
  }
}
