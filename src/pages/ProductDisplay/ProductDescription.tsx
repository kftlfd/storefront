import { Component } from 'react';
import parse from 'html-react-parser';

interface Props {
  html: string;
}

class ProductDescription extends Component<Props> {
  render() {
    return <div className="description">{parse(this.props.html)}</div>;
  }
}

export default ProductDescription;
