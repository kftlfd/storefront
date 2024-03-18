import { Component } from 'react';
import parse from 'html-react-parser';
import styled from 'styled-components';

interface Props {
  html: string;
}

class ProductDescription extends Component<Props> {
  render() {
    return <ProductInfoDescription>{parse(this.props.html)}</ProductInfoDescription>;
  }
}

export default ProductDescription;

const ProductInfoDescription = styled.div`
  margin-top: 2rem;
`;
