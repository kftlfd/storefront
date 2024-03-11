import React from "react";
import styled, { keyframes, css } from "styled-components";

import brandLogo from "../assets/brand.png";

export class SplashScreen extends React.Component {
  render() {
    return (
      <SplashScreenContainer>
        <img src={brandLogo} width={100} height={100} />
        {this.props.error ? (
          <div>{this.props.error}</div>
        ) : (
          <LinearLoading size={60} />
        )}
      </SplashScreenContainer>
    );
  }
}

const SplashScreenContainer = styled.div({
  height: "100vh",
  display: "grid",
  placeContent: "center",
  justifyItems: "center",
  rowGap: "5rem",
});

const loadingAnimation = keyframes({
  "50%": { left: "80%" },
});

const LinearLoading = styled.div({
  width: "min(50vw, 300px)",
  height: "0.5rem",
  borderRadius: (props) => props.theme.size.borderRadius,
  backgroundColor: (props) => props.theme.color.bgHover,
  overflow: "hidden",
  position: "relative",

  "&::before": {
    position: "absolute",
    left: "-30%",
    content: "''",
    display: "block",
    height: "100%",
    width: "50%",
    backgroundColor: (props) => props.theme.color.accent,
    borderRadius: "inherit",
    animation: css`2s ease infinite ${loadingAnimation}`,
  },
});
