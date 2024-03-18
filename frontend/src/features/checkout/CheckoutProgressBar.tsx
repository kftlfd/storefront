import { Component, Fragment } from 'react';
import styled from 'styled-components';

import { CheckoutStep } from './config';

interface Props {
  steps: { id: CheckoutStep; title: string }[];
  current: number;
}

class CheckoutProgressBar extends Component<Props> {
  render() {
    return (
      <Container>
        <Line className="complete" />

        {this.props.steps.slice(0, -1).map((step, index) => {
          let status = '';
          if (index === this.props.current) status = 'current';
          if (index < this.props.current) status = 'complete';

          return (
            <Fragment key={step.id}>
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
            </Fragment>
          );
        })}
      </Container>
    );
  }
}

export default CheckoutProgressBar;

const Container = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Line = styled.div`
  flex-grow: 1;
  height: 0.5rem;
  border-radius: ${({ theme }) => theme.size.borderRadius};
  background-image: ${({ theme }) =>
    `linear-gradient(to right, ${theme.color.accent} 50%, ${theme.color.bgHover} 50%)`};
  background-size: 220% 100%;
  background-position: right;
  transition: ${({ theme }) => theme.transition.default};

  &.complete {
    background-position: left;
  }
  &:first-child,
  &:last-child {
    flex-grow: 1.5;
  }
`;

const Step = styled.div`
  position: relative;
`;

const Circle = styled.div`
  height: 3rem;
  aspect-ratio: 1;
  border-radius: 50%;
  color: ${({ theme }) => theme.color.bg};
  background-color: ${({ theme }) => theme.color.bgHover};
  transition: ${({ theme }) => theme.transition.default};
  position: relative;
  overflow: hidden;

  .current &,
  .complete & {
    background-color: ${({ theme }) => theme.color.accent};
  }
`;

const Indicators = styled.div`
  height: inherit;
  position: absolute;
  left: 0;
  display: flex;
  transition: ${({ theme }) => theme.transition.default};

  .complete & {
    left: -100%;
  }
`;

const Indicator = styled.div`
  height: inherit;
  aspect-ratio: 1;
  flex-shrink: 0;
  display: grid;
  place-content: center;
  font-size: 1.3rem;
`;

const Title = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  translate: -50% 0.5rem;
  transition: ${({ theme }) => theme.transition.default};
  opacity: 0.5;

  .current &,
  .complete & {
    opacity: 1;
  }
`;
