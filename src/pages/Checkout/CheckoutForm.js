import React from "react";
import styled from "styled-components";

export default class CheckoutForm extends React.Component {
  renderFormStep() {
    const stepId = this.props.steps[this.props.current].id;

    if (stepId === "shipping") {
      return <input type={"text"} placeholder={"Address"} />;
    }

    if (stepId === "billing") {
      return <input type={"text"} placeholder={"Card"} />;
    }

    if (stepId === "confirm") {
      return <div>Click confirm to send the order</div>;
    }
  }

  renderButtons() {
    const isFirstStep = this.props.current === 0;
    const isLastStep = this.props.current === this.props.steps.length - 1;

    return (
      <ButtonsContainer>
        {!isFirstStep && <Button onClick={this.props.prevStep}>Back</Button>}

        <Button
          onClick={this.props.nextStep}
          className={isLastStep ? "accent" : ""}
        >
          {isLastStep ? "Confirm" : "Next"}
        </Button>
      </ButtonsContainer>
    );
  }

  render() {
    return (
      <div>
        {this.renderFormStep()}
        {this.renderButtons()}
      </div>
    );
  }
}

const ButtonsContainer = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "0.5rem",
});

const Button = styled.button({
  display: "inline-block",
  color: (props) => props.theme.color.text,
  fontFamily: "inherit",
  fontSize: "1rem",
  fontWeight: 400,
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: (props) => props.theme.size.borderRadius,
  backgroundColor: (props) => props.theme.color.bgButton,
  transition: (props) => props.theme.transition.default,
  cursor: "pointer",
  "&:hover, &:active": {
    backgroundColor: (props) => props.theme.color.bgHover,
  },
  "&.accent": {
    color: (props) => props.theme.color.bg,
    backgroundColor: (props) => props.theme.color.accent,
  },
  "&.accent:hover": {
    backgroundColor: (props) => props.theme.color.accentHover,
  },
});
