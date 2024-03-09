import React from "react";
import parse from "html-react-parser";

export class ProductDescription extends React.Component {
  render() {
    return <div className="description">{parse(this.props.html)}</div>;
  }
}
