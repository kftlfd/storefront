import { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';

import brandLogo from '@/assets/brand.png';

interface Props {
  error?: string;
}

export class SplashScreen extends Component<Props> {
  render() {
    return (
      <SplashScreenContainer>
        <img src={brandLogo} width={100} height={100} />
        {this.props.error ? <div>{this.props.error}</div> : <LinearLoading />}
      </SplashScreenContainer>
    );
  }
}

const SplashScreenContainer = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
  justify-items: center;
  row-gap: 5rem;
`;

const loadingAnimation = keyframes`
  50% {
    left: 80%;
  }
`;

const LinearLoading = styled.div(
  ({ theme }) => css`
    width: min(50vw, 300px);
    height: 0.5rem;
    border-radius: ${theme.size.borderRadius};
    background-color: ${theme.color.bgHover};
    overflow: hidden;
    position: relative;

    &::before {
      position: absolute;
      left: -30%;
      content: '';
      display: block;
      height: 100%;
      width: 50%;
      background-color: ${theme.color.accent};
      border-radius: inherit;
      animation: ${loadingAnimation} 2s ease infinite;
    }
  `,
);
