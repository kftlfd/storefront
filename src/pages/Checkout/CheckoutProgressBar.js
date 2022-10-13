import React from "react";
import styled from "styled-components";

export default class CheckoutProgressBar extends React.Component {
  render() {
    return (
      <Container>
        <Line className="complete" />

        {this.props.steps.slice(0, -1).map((step, index) => {
          let status = "";
          if (index === this.props.current) status = "current";
          if (index < this.props.current) status = "complete";

          return (
            <React.Fragment key={step.id}>
              <Step className={status}>
                <Circle>
                  <Indicators>
                    <Indicator>{index + 1}</Indicator>
                    <Indicator>&#10004;</Indicator>
                  </Indicators>
                </Circle>
                <Title>{step.title}</Title>
              </Step>
              <Line className={status} />
            </React.Fragment>
          );
        })}
      </Container>
    );
  }
}

const Container = styled.div({
  paddingTop: "3rem",
  paddingBottom: "3rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

const Line = styled.div({
  flexGrow: 1,
  height: "0.5rem",
  borderRadius: (props) => props.theme.size.borderRadius,
  backgroundImage: (props) =>
    `linear-gradient(to right, ${props.theme.color.accent} 50%, ${props.theme.color.bgHover} 50%)`,
  backgroundSize: "220% 100%",
  backgroundPosition: "right",
  transition: "0.8s all ease",
  "&.complete": {
    backgroundPosition: "left",
  },
  "&:first-child, &:last-child": {
    flexGrow: 1.5,
  },
});

const Step = styled.div({
  position: "relative",
});

const Circle = styled.div({
  height: "3rem",
  aspectRatio: "1",
  borderRadius: "50%",
  backgroundColor: (props) => props.theme.color.bgHover,
  transition: (props) => props.theme.transition.default,
  position: "relative",
  overflow: "hidden",
  ".current &, .complete &": {
    backgroundColor: (props) => props.theme.color.accent,
  },
});

const Indicators = styled.div({
  height: "inherit",
  position: "absolute",
  left: 0,
  display: "flex",
  transition: "0.5s all ease",
  ".complete &": {
    left: "-100%",
  },
});

const Indicator = styled.div({
  height: "inherit",
  aspectRatio: "1",
  flexShrink: 0,
  display: "grid",
  placeContent: "center",
  fontSize: "1.3rem",
});

const Title = styled.div({
  position: "absolute",
  top: "100%",
  left: "50%",
  translate: "-50% 0.5rem",
});
