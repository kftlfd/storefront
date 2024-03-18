import { Component, createRef, MouseEvent, ReactNode, RefObject } from 'react';
import styled from 'styled-components';

import { CheckoutStep } from './config';

interface Props {
  steps: { id: CheckoutStep; title: string }[];
  current: number;
  prevStep: () => void;
  nextStep: () => void;
  onConfirm: () => void;
}

export default class CheckoutForm extends Component<Props> {
  formSteps: Record<
    CheckoutStep,
    { el: ReactNode; f: (e: MouseEvent<HTMLButtonElement>) => void }
  > = {
    [CheckoutStep.Shipping]: {
      el: (
        <>
          <label htmlFor={'shipping'}>Shipping info</label>
          <FormInput name="shipping" type="text" placeholder="Shipping info" />
        </>
      ),
      f: (e) => {
        e.preventDefault();
        this.props.nextStep();
      },
    },

    [CheckoutStep.Billing]: {
      el: (
        <>
          <label htmlFor={'billing'}>Billing info</label>
          <FormInput name="billing" type="text" placeholder="Billing info" />
        </>
      ),
      f: (e) => {
        e.preventDefault();
        this.props.nextStep();
      },
    },

    [CheckoutStep.Confirm]: {
      el: <h3>Click Confirm to send the order!</h3>,
      f: (e) => {
        e.preventDefault();
        this.props.onConfirm();
      },
    },
  };

  goBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const stepId = this.props.steps[this.props.current]!.id;
    const isFirstStep = this.props.current === 0;
    const isLastStep = this.props.current === this.props.steps.length - 1;

    return (
      <Form>
        {this.props.steps.map((step, index) => {
          const title = (
            <>
              {step.title} {index < this.props.current && <>&#10004;</>}
            </>
          );
          const current = step.id === stepId;
          return (
            <Collapse key={step.id} title={title} open={current}>
              {this.formSteps[step.id].el}
            </Collapse>
          );
        })}

        <ButtonsContainer>
          {!isFirstStep && <Button onClick={this.goBack}>Back</Button>}
          <AccentButton onClick={this.formSteps[stepId].f}>
            {isLastStep ? 'Confirm' : 'Next'}
          </AccentButton>
        </ButtonsContainer>
      </Form>
    );
  }
}

const Form = styled.form`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ButtonsContainer = styled.div`
  padding-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  display: inline-block;
  color: ${({ theme }) => theme.color.text};
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.size.borderRadius};
  background-color: ${({ theme }) => theme.color.bgButton};
  transition: ${({ theme }) => theme.transition.default};
  cursor: pointer;

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.color.bgHover};
  }
`;

const AccentButton = styled(Button)`
  color: ${({ theme }) => theme.color.bg};
  background-color: ${({ theme }) => theme.color.accent};

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.color.accentHover};
  }
`;

const FormInput = styled.input`
  display: block;
  width: 100%;
  margin: 1rem 0;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.size.borderRadius};
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.bgButton};
  transition: ${({ theme }) => theme.transition.default};

  &:hover {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.color.bgHover};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.color.accent};
  }
`;

interface CollapseProps {
  title: ReactNode;
  open: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

interface CollapseState {
  height: string;
}

class Collapse extends Component<CollapseProps, CollapseState> {
  el: RefObject<HTMLDivElement>;

  constructor(props: CollapseProps) {
    super(props);
    this.el = createRef();
    this.state = { height: 'auto' };
  }

  componentDidMount() {
    const wrapperDiv = this.el.current;
    if (wrapperDiv) {
      this.setState({ height: wrapperDiv.scrollHeight + 'px' });
    }
  }

  render() {
    const elHeight = this.props.open ? this.state.height : '0px';

    return (
      <div>
        <CollapseTitle onClick={this.props.onClick} className={this.props.open ? 'open' : ''}>
          {this.props.title}
        </CollapseTitle>
        <CollapseContentWrapper ref={this.el} style={{ height: elHeight }}>
          <CollapseContent>{this.props.children}</CollapseContent>
        </CollapseContentWrapper>
      </div>
    );
  }
}

const CollapseTitle = styled.div`
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.bgHover};
  border-radius: ${({ theme }) => theme.size.borderRadius};
  transition: ${({ theme }) => theme.transition.default};

  &.open {
    color: ${({ theme }) => theme.color.bg};
    background-color: ${({ theme }) => theme.color.accent};
  }
`;

const CollapseContentWrapper = styled.div`
  transition: ${({ theme }) => theme.transition.default};
  overflow: hidden;
`;

const CollapseContent = styled.div`
  padding: 1rem 1rem 2rem;
`;
