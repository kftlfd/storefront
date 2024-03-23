import { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Product } from '@/api/types';
import ChevronIcon from '@/assets/chevron.svg?react';
import Dropdown, { DropdownMenuItem } from '@/components/Dropdown';

import Pagination from './Pagination';
import ProductCard from './ProductCard';

const ITEMS_ON_PAGE = 8;

enum Params {
  Page = 'page',
  Sort = 'sort',
  Asc = 'asc',
}

enum Sort {
  Category = 'category',
  Name = 'name',
  Brand = 'brand',
  Price = 'price',
  InStock = 'inStock',
}

const sortOptionsTitles = {
  [Sort.Category]: 'Category',
  [Sort.Name]: 'Name',
  [Sort.Brand]: 'Brand',
  [Sort.Price]: 'Price',
  [Sort.InStock]: 'In Stock',
};

const sortingFn = {
  string: (a?: string, b?: string) => {
    const s1 = a?.toLowerCase() ?? '';
    const s2 = b?.toLowerCase() ?? '';
    if (s1 === s2) return 0;
    return s1 > s2 ? 1 : -1;
  },
  number: (a?: number, b?: number) => (a ?? 0) - (b ?? 0),
  boolean: (a?: boolean, b?: boolean) => Number(a ?? false) - Number(b ?? false),
};

const productSort: Record<Sort, (a: Product, b: Product) => number> = {
  [Sort.Category]: (a, b) => sortingFn.string(a.category, b.category),
  [Sort.Name]: (a, b) => sortingFn.string(a.name, b.name),
  [Sort.Brand]: (a, b) => sortingFn.string(a.brand, b.brand),
  [Sort.Price]: (a, b) => sortingFn.number(a.prices[0]?.amount, b.prices[0]?.amount),
  [Sort.InStock]: (a, b) => sortingFn.boolean(a.inStock, b.inStock),
};

interface Props extends RouteComponentProps {
  categoryTitle: string;
  products: Product[];
}

class CategoryView extends Component<Props> {
  parseParams = () => {
    const params = new URLSearchParams(this.props.location.search);

    const page = (() => {
      const p = parseInt(params.get(Params.Page) ?? '');
      return Number.isNaN(p) || p < 1 ? 1 : p;
    })();

    const sort = (() => {
      const s = (params.get(Params.Sort) ?? '') as Sort;
      return Object.values(Sort).includes(s) ? s : null;
    })();

    const asc = (() => {
      const a = params.get(Params.Asc);
      return a === 'false' ? false : true;
    })();

    return { page, sort, asc };
  };

  updateParams = ({ page, sort, asc }: { page?: number; sort?: Sort | null; asc?: boolean }) => {
    const params = new URLSearchParams(this.props.location.search);

    if (page !== undefined) {
      params.set(Params.Page, String(page));
    }

    if (sort !== undefined) {
      if (sort === null) {
        params.delete(Params.Sort);
      } else {
        params.set(Params.Sort, sort);
      }
    }

    if (asc !== undefined) {
      if (asc === false) {
        params.set(Params.Asc, String(asc));
      } else {
        params.delete(Params.Asc);
      }
    }

    this.props.history.replace('?' + params.toString());
  };

  scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  render(): ReactNode {
    const { categoryTitle, products } = this.props;
    const { page, sort, asc } = this.parseParams();

    let items = [...products];

    if (sort) items.sort(productSort[sort]);
    if (!asc) items.reverse();

    const needPagination = items.length > ITEMS_ON_PAGE;
    const totalPages = Math.ceil(items.length / ITEMS_ON_PAGE);

    if (needPagination) {
      const p = page > 0 ? page - 1 : page;
      const start = p * ITEMS_ON_PAGE;
      const end = start + ITEMS_ON_PAGE;
      items = items.slice(start, end);
    }

    return (
      <>
        <CategoryHeader>
          <CategoryTitle>{categoryTitle}</CategoryTitle>

          <CategorySorting>
            <SortingLabel>Sort by</SortingLabel>

            <Dropdown target={<Button>{sort ? sortOptionsTitles[sort] : 'None'}</Button>}>
              <DropdownMenuItem onClick={() => this.updateParams({ sort: null })}>
                None
              </DropdownMenuItem>
              {Object.values(Sort).map((sortValue) => (
                <DropdownMenuItem
                  key={sortValue}
                  onClick={() => this.updateParams({ sort: sortValue })}
                >
                  {sortOptionsTitles[sortValue]}
                </DropdownMenuItem>
              ))}
            </Dropdown>

            <Button onClick={() => this.updateParams({ asc: !asc })}>
              <Chevron style={{ rotate: asc ? '180deg' : '0deg' }} />
            </Button>
          </CategorySorting>
        </CategoryHeader>

        <ListingsGrid>
          {items.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </ListingsGrid>

        {needPagination && (
          <Pagination
            page={page}
            total={totalPages}
            onSelect={(newPage) => {
              if (newPage !== page) {
                this.scrollToTop();
                this.updateParams({ page: newPage });
              }
            }}
          />
        )}
      </>
    );
  }
}

export default withRouter(CategoryView);

const CategoryHeader = styled.div`
  padding-block: 3rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const CategoryTitle = styled.h1`
  margin: 0;
  font-size: 42px;
  font-weight: 400;
`;

const CategorySorting = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
`;

const SortingLabel = styled.div`
  align-self: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  display: grid;
  place-content: center;
  cursor: pointer;
  border: none;
  font-family: inherit;
  font-size: 1rem;
  font-weight: normal;
  border-radius: ${(props) => props.theme.size.borderRadius};
  color: ${(props) => props.theme.color.text};
  background-color: ${(props) => props.theme.color.bgButton};
  transition: ${(props) => props.theme.transition.default};

  &:hover {
    background-color: ${(props) => props.theme.color.bgHover};
  }
`;

const Chevron = styled(ChevronIcon)`
  height: 1rem;
  fill: ${({ theme }) => theme.color.text};
  transition: ${({ theme }) => theme.transition.default};
`;

const ListingsGrid = styled.div`
  padding-bottom: 4rem;
  display: grid;
  justify-content: center;
  align-items: start;
  column-gap: 40px;
  row-gap: 60px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
