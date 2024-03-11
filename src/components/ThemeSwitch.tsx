import { Component, ContextType } from 'react';
import styled from 'styled-components';

import themeDarkIcon from '@/assets/theme-dark.svg';
import themeLightIcon from '@/assets/theme-light.svg';
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
          <ThemeButton src={light ? themeLightIcon : themeDarkIcon} alt={`${variant} theme`} />
        </HeaderButton>
      </HeaderButtonContainer>
    );
  }
}

const ThemeButton = styled.img(({ theme }) => ({
  height: '1rem',
  width: '1rem',
  filter: theme.img.filter,
}));
