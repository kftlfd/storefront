import { Component, createRef, ReactNode, RefObject } from 'react';
import styled from 'styled-components';

interface CollapseProps {
  open: boolean;
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
      <CollapseContentWrapper ref={this.el} style={{ height: elHeight }}>
        {this.props.children}
      </CollapseContentWrapper>
    );
  }
}

export default Collapse;

const CollapseContentWrapper = styled.div`
  transition: ${({ theme }) => theme.transition.default};
  overflow: hidden;
`;
