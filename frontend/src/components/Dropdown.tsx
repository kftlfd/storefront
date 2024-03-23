import { Component, createRef, CSSProperties, ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

type Position = 'bottom-left' | 'bottom-right';

const getPositionStyle = (pos: Position, bcr?: DOMRect): CSSProperties => {
  switch (pos) {
    case 'bottom-right':
      return {
        left: bcr?.right ?? 0,
        top: bcr?.bottom ?? 0,
        translate: '-100%',
      };
    case 'bottom-left':
      return {
        left: bcr?.left ?? 0,
        top: bcr?.bottom ?? 0,
      };
  }
};

interface Props {
  target: ReactNode;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  position?: Position;
  fixed?: boolean;
}

interface State {
  isOpen: boolean;
}

export default class Dropdown extends Component<Props, State> {
  targetRef: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.targetRef = createRef();
  }

  toggle = () => this.setState((prev) => ({ isOpen: !prev.isOpen }));

  close = () => this.setState({ isOpen: false });

  render() {
    const isOpen = this.props.isOpen ?? this.state.isOpen;
    const handleClickTarget = this.props.isOpen === undefined ? this.toggle : undefined;
    const close = this.props.onClose ?? this.close;

    const bcr = this.targetRef.current?.getBoundingClientRect();
    const { position = 'bottom-right', fixed } = this.props;
    const positionStyle = getPositionStyle(position, bcr);

    return (
      <>
        <DropdownTarget ref={this.targetRef} onClick={handleClickTarget}>
          {this.props.target}
        </DropdownTarget>

        {isOpen &&
          createPortal(
            <>
              <Backdrop onClick={close} style={fixed ? { position: 'fixed' } : undefined} />

              <DropdownMenu
                onClick={close}
                style={{ ...positionStyle, ...(fixed ? { position: 'fixed' } : {}) }}
              >
                {this.props.children}
              </DropdownMenu>
            </>,
            document.body,
          )}
      </>
    );
  }
}

export class DropdownMenuItem extends Component<{
  selected?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}> {
  render(): ReactNode {
    const { selected, children, onClick } = this.props;

    return (
      <DropdownMenuButton className={selected ? 'selected' : ''} onClick={onClick}>
        {children}
      </DropdownMenuButton>
    );
  }
}

const DropdownTarget = styled.div`
  display: inline-block;
`;

const Backdrop = styled.div<{ $zIndex?: number }>`
  position: absolute;
  inset: 0;
  z-index: ${({ $zIndex }) => $zIndex ?? 100};
`;

const DropdownMenu = styled.div<{ $zIndex?: number }>`
  position: absolute;
  padding-block: 0.5rem;
  border-radius: ${({ theme }) => theme.size.borderRadius};
  background-color: ${({ theme }) => theme.color.bg};
  box-shadow: ${({ theme }) => theme.shadow.lighter};
  transition: ${({ theme }) => theme.transition.default};
  z-index: ${({ $zIndex }) => $zIndex ?? 110};
`;

const DropdownMenuButton = styled.button`
  display: block;
  width: 100%;
  background-color: transparent;
  border: none;
  padding-inline: 1rem;
  padding-block: 0.5rem;
  white-space: nowrap;
  text-align: unset;
  font-family: inherit;
  font-size: inherit;
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.default};

  &.selected {
    background-color: ${({ theme }) => theme.color.bgButton};
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.bgHover};
  }
`;
