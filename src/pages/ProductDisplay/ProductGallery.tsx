import { Component } from 'react';
import styled from 'styled-components';

import chevronIcon from '@/assets/chevron.svg';

interface Props {
  gallery: string[];
  name: string;
}

interface State {
  imgIndexSelected: number;
  galleryLen: number;
}

class ProductGallery extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      imgIndexSelected: 0,
      galleryLen: this.props.gallery.length,
    };
  }

  selectImg = (index: number) => () => this.setState({ imgIndexSelected: index });

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
          <PreviewContainer className="previews-container">
            {this.props.gallery.map((img, i) => {
              const status = i === this.state.imgIndexSelected ? 'selected' : '';
              return (
                <PreviewImgBtn
                  key={img}
                  $img={img}
                  onClick={this.selectImg(i)}
                  className={status}
                />
              );
            })}
          </PreviewContainer>
          {this.state.galleryLen > 1 && (
            <div className="previews-controlls">
              <PreviewControllBtn onClick={this.prevImage}>
                <Chevron src={chevronIcon} $direction="left" />
              </PreviewControllBtn>
              <PreviewControllBtn onClick={this.nextImage}>
                <Chevron src={chevronIcon} $direction="right" />
              </PreviewControllBtn>
            </div>
          )}
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

export default ProductGallery;

const PreviewContainer = styled.div`
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.bgHover};
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #777;
  }
`;

const PreviewImgBtn = styled.button<{ $img: string }>`
  margin: 2px;
  padding: 0;
  display: block;
  height: 4rem;
  aspect-ratio: 1;
  flex-shrink: 0;
  border: none;
  border-radius: ${({ theme }) => theme.size.borderRadius};
  background-color: transparent;
  background-image: url(${({ $img }) => $img});
  background-size: cover;
  transition: ${({ theme }) => theme.transition.default};
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.color.text};
  }
  &.selected {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.color.accent};
  }
`;

const PreviewControllBtn = styled.button`
  padding: 0;
  display: grid;
  place-content: center;
  height: 30px;
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.color.bgButton};
  border: none;
  border-radius: ${({ theme }) => theme.size.borderRadius};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.default};

  &:hover {
    background-color: ${({ theme }) => theme.color.bgHover};
  }
`;

const Chevron = styled.img<{ $direction: 'left' | 'right' }>`
  display: block;
  height: 1rem;
  filter: ${({ theme }) => theme.img.filter};
  rotate: ${({ $direction }) => ($direction === 'left' ? '90deg' : '-90deg')};
`;

const ImageMain = styled.img`
  border-radius: ${({ theme }) => theme.size.borderRadius};
`;
