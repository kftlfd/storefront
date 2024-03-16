import { Component, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThemeProvider as StyledProvider } from 'styled-components';

import { StoreState } from '@/store';
import { switchTheme } from '@/store/settings';

import { ThemeContext, type ThemeContextValue } from './context';
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

  switchTheme = () => {
    this.setState((prev) => ({
      variant: prev.variant === 'light' ? 'dark' : 'light',
    }));
    this.props.switchTheme();
  };

  render() {
    const contextVal: ThemeContextValue = {
      switchTheme: this.switchTheme,
      variant: this.state.variant,
    };

    const theme = getTheme(contextVal.variant);

    return (
      <ThemeContext.Provider value={contextVal}>
        <StyledProvider theme={theme}>{this.props.children}</StyledProvider>
      </ThemeContext.Provider>
    );
  }
}

export default withStore(ThemeProvider);
