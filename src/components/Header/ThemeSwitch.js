import React from "react";
import { ThemeContext } from "../ThemeContext";
import { HeaderButtonContainer, HeaderButton } from "./ui";

export class ThemeSwitch extends React.Component {
  static contextType = ThemeContext;

  render() {
    return (
      <HeaderButtonContainer>
        <HeaderButton onClick={this.context.switchTheme}>theme</HeaderButton>
      </HeaderButtonContainer>
    );
  }
}
