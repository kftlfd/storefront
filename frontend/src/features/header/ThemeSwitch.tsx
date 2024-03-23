import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import ThemeDarkIcon from '@/assets/theme-dark.svg?react';
import ThemeLightIcon from '@/assets/theme-light.svg?react';
import { StoreState } from '@/store';
import { switchTheme } from '@/store/settings';

import { HeaderButton, HeaderButtonContainer } from './HeaderButton';

const withStore = connect(
  (state: StoreState) => ({
    theme: state.settings.theme,
  }),
  {
    switchTheme,
  },
);

type StoreProps = ConnectedProps<typeof withStore>;

class ThemeSwitch extends Component<StoreProps> {
  render() {
    const variant = this.props.theme;
    const light = variant === 'light';

    return (
      <HeaderButtonContainer zIndex={71}>
        <HeaderButton onClick={() => this.props.switchTheme()}>
          {light ? <Light /> : <Dark />}
        </HeaderButton>
      </HeaderButtonContainer>
    );
  }
}

export default withStore(ThemeSwitch);

const ThemeIcon = styled.div`
  height: 1rem;
  width: 1rem;
  fill: ${({ theme }) => theme.color.text};
`;

const Light = ThemeIcon.withComponent(ThemeLightIcon);
const Dark = ThemeIcon.withComponent(ThemeDarkIcon);
