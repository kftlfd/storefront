import { Component } from 'react';
import styled from 'styled-components';

import ChevronIcon from '@/assets/chevron.svg?react';

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
      <StyledProductGallery>
        <PreviewSection>
          <PreviewContainer>
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
            <PreviewsControlls>
              <PreviewControllBtn onClick={this.prevImage}>
                <Chevron $direction="left" />
              </PreviewControllBtn>
              <PreviewControllBtn onClick={this.nextImage}>
                <Chevron $direction="right" />
              </PreviewControllBtn>
            </PreviewsControlls>
          )}
        </PreviewSection>

        <ImageContainer>
          <ImageMain src={this.props.gallery[this.state.imgIndexSelected]} alt={this.props.name} />
        </ImageContainer>
      </StyledProductGallery>
    );
  }
}

export default ProductGallery;

const StyledProductGallery = styled.div`
  max-height: min(75vh, 600px);
  display: grid;
  grid-template-columns: min-content auto;
  align-items: flex-start;
  justify-items: flex-start;
  gap: 2rem;

  @media (max-width: 799px) {
    grid-template-columns: 100%;
    max-width: calc(100vw - 2rem);
    max-height: none;
  }
`;

const PreviewSection = styled.div`
  max-height: inherit;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 799px) {
    flex-direction: row;
    max-width: 100%;
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.bgHover};
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #777;
  }

  @media (max-width: 799px) {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

const PreviewsControlls = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;

  @media (max-width: 799px) {
    flex-direction: column-reverse;
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

const Chevron = styled(ChevronIcon)<{ $direction: 'left' | 'right' }>`
  height: 1rem;
  fill: ${({ theme }) => theme.color.text};
  rotate: ${({ $direction }) => ($direction === 'left' ? '90deg' : '-90deg')};
`;

const ImageContainer = styled.div`
  max-height: inherit;

  @media (max-width: 799px) {
    grid-row: 1;
    justify-self: center;
  }
`;

const ImageMain = styled.img`
  max-height: inherit;
  max-width: 100%;
  border-radius: ${({ theme }) => theme.size.borderRadius};

  @media (max-width: 799px) {
    max-height: 66vh;
    max-width: calc(100vw - 2rem);
  }
`;
