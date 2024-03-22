import { Component, ReactNode } from 'react';
import styled from 'styled-components';

import Collapse from '@/components/Collapse';

import { CheckoutStep } from './config';

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

const formSteps: Record<CheckoutStep, ReactNode> = {
  [CheckoutStep.Shipping]: (
    <>
      <label htmlFor={'shipping'}>Shipping info</label>
      <FormInput name="shipping" type="text" placeholder="Shipping info" />
    </>
  ),

  [CheckoutStep.Billing]: (
    <>
      <label htmlFor={'billing'}>Billing info</label>
      <FormInput name="billing" type="text" placeholder="Billing info" />
    </>
  ),

  [CheckoutStep.Confirm]: <h3>Click Confirm to send the order!</h3>,
};

interface Props {
  steps: { id: CheckoutStep; title: string }[];
  current: number;
  prevStep: () => void;
  nextStep: () => void;
  onConfirm: () => void;
}

class CheckoutForm extends Component<Props> {
  render() {
    const { steps, current, prevStep, nextStep, onConfirm } = this.props;
    const isFirst = current === 0;
    const isLast = current === steps.length - 1;
    const onNext = isLast ? onConfirm : nextStep;

    return (
      <Form>
        {steps.map((step, index) => {
          const active = current === index;

          return (
            <div key={step.id}>
              <StepTitle className={active ? 'open' : ''}>
                {step.title} {index < current && <>&#10004;</>}
              </StepTitle>
              <Collapse open={active}>
                <CollapseContent>{formSteps[step.id]}</CollapseContent>
              </Collapse>
            </div>
          );
        })}

        <ButtonsContainer>
          {!isFirst && (
            <Button type="button" onClick={prevStep}>
              Back
            </Button>
          )}
          <AccentButton type="button" onClick={onNext}>
            {isLast ? 'Confirm' : 'Next'}
          </AccentButton>
        </ButtonsContainer>
      </Form>
    );
  }
}

export default CheckoutForm;

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

const StepTitle = styled.div`
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

const CollapseContent = styled.div`
  padding: 1rem 1rem 2rem;
`;
