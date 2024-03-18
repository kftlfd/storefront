import { Component, ContextType } from 'react';
import styled from 'styled-components';

import ThemeDarkIcon from '@/assets/theme-dark.svg?react';
import ThemeLightIcon from '@/assets/theme-light.svg?react';
import { HeaderButton, HeaderButtonContainer } from '@/layout/header';
import { ThemeContext } from '@/theme/context';

export default class ThemeSwitch extends Component {
  static contextType = ThemeContext;
  declare context: ContextType<typeof ThemeContext>;

  render() {
    const variant = this.context.variant;
    const light = variant === 'light';

    return (
      <HeaderButtonContainer zIndex={71}>
        <HeaderButton onClick={this.context.switchTheme}>
          {light ? <Light /> : <Dark />}
        </HeaderButton>
      </HeaderButtonContainer>
    );
  }
}

const ThemeIcon = styled.div`
  height: 1rem;
  width: 1rem;
  fill: ${({ theme }) => theme.color.text};
`;

const Light = ThemeIcon.withComponent(ThemeLightIcon);
const Dark = ThemeIcon.withComponent(ThemeDarkIcon);
