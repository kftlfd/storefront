import React from "react";
import styled from "styled-components";

import chevronIcon from "../../assets/chevron.svg";

export class ProductGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIndexSelected: 0,
      galleryLen: this.props.gallery.length,
    };
  }

  selectImg = (index) => () => this.setState({ imgIndexSelected: index });

  prevImage = () => {
    const mod = this.state.galleryLen;
    this.setState((prev) => ({
      imgIndexSelected: (prev.imgIndexSelected - 1 + mod) % mod,
    }));
  };

  nextImage = () => {
    const mod = this.state.galleryLen;
    this.setState((prev) => ({
      imgIndexSelected: (prev.imgIndexSelected + 1 + mod) % mod,
    }));
  };

  render() {
    return (
      <div className="ProductGallery">
        <div className="previews-section">
          <div className="previews-container">
            {this.props.gallery.map((img, i) => {
              const status =
                i === this.state.imgIndexSelected ? " selected" : "";
              return (
                <PreviewImgBtn
                  key={img}
                  img={img}
                  onClick={this.selectImg(i)}
                  className={"preview-button" + status}
                />
              );
            })}
          </div>
          <div className="previews-controlls">
            <PreviewControllBtn onClick={this.prevImage}>
              <Chevron src={chevronIcon} direction={"left"} />
            </PreviewControllBtn>
            <PreviewControllBtn onClick={this.nextImage}>
              <Chevron src={chevronIcon} direction={"right"} />
            </PreviewControllBtn>
          </div>
        </div>

        <div className="image-container">
          <ImageMain
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
  borderRadius: (props) => props.theme.size.borderRadius,
  "&:hover": {
    boxShadow: (props) => `0 0 0 2px ${props.theme.color.text}`,
  },
  "&.selected": {
    boxShadow: (props) => `0 0 0 2px ${props.theme.color.accent}`,
  },
});

const PreviewControllBtn = styled.button({
  display: "block",
  flexGrow: 1,
  aspectRatio: "1/1",
  backgroundColor: (props) => props.theme.color.bg,
  border: "none",
  borderRadius: (props) => props.theme.size.borderRadius,
  display: "grid",
  placeContent: "center",
  cursor: "pointer",
  transition: (props) => props.theme.transition.default,

  "&:hover": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
});

const Chevron = styled.img({
  display: "block",
  height: "1rem",
  filter: (props) => props.theme.img.filter,
  rotate: (props) => (props.direction === "left" ? "90deg" : "-90deg"),
});

const ImageMain = styled.img({
  borderRadius: (props) => props.theme.size.borderRadius,
});
