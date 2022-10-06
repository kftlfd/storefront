import styled, { keyframes, css } from "styled-components";

const spinnerAnimation = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const LoadingSpinner = styled.div({
  height: (props) => (props.size ? `${props.size}px` : "40px"),
  width: (props) => (props.size ? `${props.size}px` : "40px"),
  border: (props) =>
    (props.size ? `${props.size / 10}` : "4") + "px solid #1c87c9",
  borderRadius: "50%",
  borderRightColor: "transparent",
  animation: css`1.5s linear infinite ${spinnerAnimation}`,
  margin: "auto",
});
