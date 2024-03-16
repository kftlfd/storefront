import { Component, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThemeProvider as StyledProvider } from 'styled-components';

import { StoreDispatch, StoreState } from '@/store';
import { switchTheme } from '@/store/settings';

import { ThemeContext, type ThemeContextValue } from './context';
import { getTheme, ThemeVariant } from './theme';

const mapStateToProps = (state: StoreState) => ({
  theme: state.settings.theme,
});

const mapDispatchToProps = (dispatch: StoreDispatch) => ({
  switchTheme: () => dispatch(switchTheme()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {
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

export default connector(ThemeProvider);
