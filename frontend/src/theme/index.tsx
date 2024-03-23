import { Component, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThemeProvider as StyledProvider } from 'styled-components';

import { StoreState } from '@/store';
import { switchTheme } from '@/store/settings';

import { getTheme, ThemeVariant } from './theme';

const withStore = connect(
  (state: StoreState) => ({
    theme: state.settings.theme,
  }),
  {
    switchTheme,
  },
);

type StoreProps = ConnectedProps<typeof withStore>;

interface Props extends StoreProps {
  children?: ReactNode;
}

type State = {
  variant: ThemeVariant;
};

class ThemeProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      variant: props.theme,
    };
  }

  render() {
    const theme = getTheme(this.props.theme);

    return <StyledProvider theme={theme}>{this.props.children}</StyledProvider>;
  }
}

export default withStore(ThemeProvider);
