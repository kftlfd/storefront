import React from "react";
import styled from "styled-components";

export class ProductGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIndexSelected: 0,
    };
  }

  selectImg = (index) => () => this.setState({ imgIndexSelected: index });

  render() {
    return (
      <div className="ProductGallery">
        <div className="previews-container">
          {this.props.gallery.map((img, i) => (
            <PreviewImgBtn
              key={img}
              img={img}
              onClick={this.selectImg(i)}
              className={
                i === this.state.imgIndexSelected
                  ? "preview-button selected"
                  : "preview-button"
              }
            />
          ))}
        </div>

        <div className="image-container">
          <img
            className="image-main"
            src={this.props.gallery[this.state.imgIndexSelected]}
            alt={this.props.name}
          />
        </div>
      </div>
    );
  }
}

const PreviewImgBtn = styled.button({
  transition: (props) => props.theme.transition.default,
  backgroundImage: (props) => `url(${props.img})`,
  "&:hover": {
    boxShadow: (props) => `0 0 0 2px ${props.theme.color.text}`,
  },
  "&.selected": {
    boxShadow: (props) => `0 0 0 2px ${props.theme.color.accent}`,
  },
});
