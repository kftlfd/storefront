import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../ThemeContext";
import { HeaderButtonContainer, HeaderButton } from "../../layout/header";

import themeLightIcon from "../../assets/theme-light.svg";
import themeDarkIcon from "../../assets/theme-dark.svg";

export class ThemeSwitch extends React.Component {
  static contextType = ThemeContext;

  render() {
    const variant = this.context.variant;
    const light = variant === "light";
    return (
      <HeaderButtonContainer zIndex={71}>
        <HeaderButton onClick={this.context.switchTheme}>
          <ThemeButton
            src={light ? themeLightIcon : themeDarkIcon}
            alt={`${variant} theme`}
          />
        </HeaderButton>
      </HeaderButtonContainer>
    );
  }
}

const ThemeButton = styled.img({
  height: "1rem",
  width: "1rem",
  filter: (props) => props.theme.img.filter,
});
