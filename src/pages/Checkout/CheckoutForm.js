import React from "react";
import styled from "styled-components";

export default class CheckoutForm extends React.Component {
  formActions = {
    prevStep: (e) => {
      e.preventDefault();
      this.props.prevStep();
    },
    shipping: (e) => {
      e.preventDefault();
      this.props.nextStep();
    },
    billing: (e) => {
      e.preventDefault();
      this.props.nextStep();
    },
    confirm: (e) => {
      e.preventDefault();
      window.alert("Thanks for shoping at eStore!");
    },
  };

  render() {
    const stepId = this.props.steps[this.props.current].id;
    const isFirstStep = this.props.current === 0;
    const isLastStep = this.props.current === this.props.steps.length - 1;

    return (
      <Form>
        <Collapse title={"Shipping"} open={stepId === "shipping"}>
          <label htmlFor={"address"}>Address</label>
          <FormInput name="address" type="text" placeholder="Address" />
        </Collapse>

        <Collapse title={"Billing"} open={stepId === "billing"}>
          <label htmlFor={"card"}>Card</label>
          <FormInput name="card" type="text" placeholder="Card" />
        </Collapse>

        <Collapse title={"Confirm"} open={stepId === "confirm"}>
          <div>Review Order Summary and click Confirm to send the order</div>
        </Collapse>

        <ButtonsContainer>
          {!isFirstStep && (
            <Button onClick={this.formActions.prevStep}>Back</Button>
          )}
          <AccentButton onClick={this.formActions[stepId]}>
            {isLastStep ? "Confirm" : "Next"}
          </AccentButton>
        </ButtonsContainer>
      </Form>
    );
  }
}

const Form = styled.form({
  flexGrow: "1",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

const ButtonsContainer = styled.div({
  paddingTop: "1rem",
  paddingBottom: "3rem",
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
});

const AccentButton = styled(Button)({
  color: (props) => props.theme.color.bg,
  backgroundColor: (props) => props.theme.color.accent,
  "&:hover, &:active": {
    backgroundColor: (props) => props.theme.color.accentHover,
  },
});

const FormInput = styled.input({
  display: "block",
  width: "100%",
  margin: "1rem 0",
  padding: "0.8rem 1rem",
  border: "none",
  borderRadius: (props) => props.theme.size.borderRadius,
  color: (props) => props.theme.color.text,
  backgroundColor: (props) => props.theme.color.bgButton,
  transition: (props) => props.theme.transition.default,
  "&:hover": {
    boxShadow: (props) => `0 0 0 2px ${props.theme.color.bgHover}`,
  },
  "&:focus": {
    outline: "none",
    boxShadow: (props) => `0 0 0 2px ${props.theme.color.accent}`,
  },
});

class Collapse extends React.Component {
  constructor(props) {
    super(props);
    this.el = React.createRef();
    this.state = { height: "auto" };
  }

  componentDidMount() {
    this.setState({ height: this.el.current.scrollHeight + "px" });
  }

  render() {
    const elHeight = this.props.open ? this.state.height : "0px";

    return (
      <div>
        <CollapseTitle
          onClick={this.props.onClick}
          className={this.props.open ? "open" : ""}
        >
          {this.props.title}
        </CollapseTitle>
        <CollapseContentWrapper ref={this.el} style={{ height: elHeight }}>
          <CollapseContent>{this.props.children}</CollapseContent>
        </CollapseContentWrapper>
      </div>
    );
  }
}

const CollapseTitle = styled.div({
  padding: "0.5rem 1rem",
  color: (props) => props.theme.color.text,
  backgroundColor: (props) => props.theme.color.bgHover,
  borderRadius: (props) => props.theme.size.borderRadius,
  transition: "all 0.6s ease",
  "&.open": {
    color: (props) => props.theme.color.bg,
    backgroundColor: (props) => props.theme.color.accent,
  },
});

const CollapseContentWrapper = styled.div({
  transition: "all 0.6s ease",
  overflow: "hidden",
});

const CollapseContent = styled.div({
  padding: "1rem 1rem 3rem",
});
