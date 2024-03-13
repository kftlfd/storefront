import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { getProductById, getProductsByCategory } from '@/api';
import chevronIcon from '@/assets/chevron.svg';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PageContainer, PageMainText } from '@/layout/page';
import { StoreState } from '@/store';
import { addToCart, toggleMiniCart } from '@/store/cart';
import { loadCategory } from '@/store/category';
import { loadProduct, loadProductsBasics } from '@/store/products';

import ListingItem from './ListingItem';
import {
  Button,
  ButtonIcon,
  CategoryHeader,
  CategorySorting,
  CategoryTitle,
  ListingsGrid,
  PageArrow,
  Pagination,
  PaginationBtn,
  SortingLabel,
} from './ProductListing.ui';
import { SortDropdown } from './SortDropdown';

type RouterProps = RouteComponentProps<{ categoryId: string }>;

const withStore = connect(
  (state: StoreState, ownProps: RouterProps) => ({
    currency: state.currency.selected,
    categoryId: ownProps.match.params.categoryId,
    categoryItems: state.category.items[ownProps.match.params.categoryId],
    products: state.products.items,
    getProductsByCategory,
    getProductById,
  }),
  {
    loadCategory,
    loadProductsBasics,
    loadProduct,
    addToCart,
    toggleMiniCart,
  },
);

type StoreProps = ConnectedProps<typeof withStore>;

const ITEMS_ON_PAGE = 8;

function getPage(s: string) {
  let start = s.search('p=');
  if (start < 0) return 0;
  start += 2;
  let end = s.indexOf(';', start);
  if (end < 0) end = s.length;
  const page = s.slice(start, end);
  if (!page) return 0;
  return parseInt(page);
}

enum Sort {
  Category = 'category',
  Name = 'name',
  Brand = 'brand',
  Price = 'price',
  InStock = 'inStock',
}

interface Props extends RouterProps, StoreProps {}

interface State {
  loading: boolean;
  error: string | null;
  sortBy: Sort | null;
  sortAsc: boolean;
}

class ProductListing extends Component<Props, State> {
  constructor(props: Props) {
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

  componentDidUpdate(prevProps: Props) {
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
    const title = this.props.categoryId.charAt(0).toUpperCase() + this.props.categoryId.slice(1);

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
        console.error(err);
        this.setState({ error: err instanceof Error ? err.message : 'error' });
        document.title = 'Not found';
      });
  };

  loadProduct = async (id: string) => {
    const product = await this.props.getProductById(id);
    this.props.loadProduct(product);
    return product;
  };

  addToCart = async (id: string) => {
    const product = this.props.products[id]?.loaded
      ? this.props.products[id]
      : await this.loadProduct(id);

    if (!product) {
      console.warn('No product');
      return;
    }

    const attributes: Record<string, string> = {};
    product.attributes?.forEach((attr) => {
      const itemId = attr.items[0]?.id;
      if (itemId) {
        attributes[attr.id] = itemId;
      }
    });

    this.props.addToCart({ id, attributes });
    this.props.toggleMiniCart(true);
  };

  toggleSortOrder = () => {
    this.setState((prev) => ({ sortAsc: !prev.sortAsc }));
  };

  sortOptions = [
    {
      id: Sort.Category,
      f: () => this.setState({ sortBy: Sort.Category }),
    },
    {
      id: Sort.Name,
      f: () => this.setState({ sortBy: Sort.Name }),
    },
    {
      id: Sort.Brand,
      f: () => this.setState({ sortBy: Sort.Brand }),
    },
    {
      id: Sort.Price,
      f: () => this.setState({ sortBy: Sort.Price }),
    },
    {
      id: Sort.InStock,
      f: () => this.setState({ sortBy: Sort.InStock }),
    },
  ];

  sortOptionsTitles = {
    [Sort.Category]: 'Category',
    [Sort.Name]: 'Name',
    [Sort.Brand]: 'Brand',
    [Sort.Price]: 'Price',
    [Sort.InStock]: 'In Stock',
  };

  sortingFunctions: Record<'string' | 'price' | 'inStock', (a: string, b: string) => number> = {
    string: (a, b) => {
      if (
        !this.state.sortBy ||
        this.state.sortBy === Sort.Price ||
        this.state.sortBy === Sort.InStock
      ) {
        return 0;
      }
      const s1 = this.props.products[a]?.[this.state.sortBy].toLowerCase() ?? '';
      const s2 = this.props.products[b]?.[this.state.sortBy].toLowerCase() ?? '';
      if (s1 === s2) return 0;
      return s1 > s2 ? 1 : -1;
    },

    price: (a, b) =>
      (this.props.products[a]?.prices[0]?.amount ?? 0) -
      (this.props.products[b]?.prices[0]?.amount ?? 0),

    inStock: (a, b) =>
      Number(this.props.products[a]?.inStock) - Number(this.props.products[b]?.inStock),
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
        {this.props.categoryId.charAt(0).toUpperCase() + this.props.categoryId.slice(1)}
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

  renderPagination = (currentPage: number, hasPrev: boolean, hasNext: boolean) => (
    <Pagination>
      {hasPrev && (
        <div onClick={this.scrollToTop}>
          <PaginationBtn to={`?p=${currentPage - 1}`}>
            <PageArrow src={chevronIcon} />
          </PaginationBtn>
        </div>
      )}

      <div onClick={this.scrollToTop}>
        <PaginationBtn to={'?p=' + currentPage}>{currentPage}</PaginationBtn>
      </div>

      {hasNext && (
        <div onClick={this.scrollToTop}>
          <PaginationBtn to={`?p=${currentPage + 1}`}>
            <PageArrow src={chevronIcon} right={true} />
          </PaginationBtn>
        </div>
      )}
    </Pagination>
  );

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
          {items.map((id) => {
            const product = this.props.products[id];
            return product ? (
              <ListingItem
                key={id}
                item={product}
                currency={this.props.currency}
                addToCart={(id) => void this.addToCart(id)}
              />
            ) : null;
          })}
        </ListingsGrid>

        {needPagination && this.renderPagination(currentPage, hasPrev, hasNext)}
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

export default withStore(withRouter(ProductListing));
