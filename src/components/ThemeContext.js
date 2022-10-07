import React from "react";
import { ThemeProvider as StyledProvider } from "styled-components";

export const ThemeContext = React.createContext();

export default class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      variant: "light",
    };
  }

  switchTheme = () => {
    this.setState((prev) => ({
      variant: prev.variant === "light" ? "dark" : "light",
    }));
  };

  getTheme = () => {
    const light = this.state.variant === "light";
    return {
      color: {
        bg: light ? "#FFFFFF" : "#333",
        bgHover: light ? "#EEEEEE" : "#444",
        accent: "#5ECE7B",
        accentHover: "#92DDA6",
        text: light ? "#1D1F22" : "#bbb",
        backdrop: "hsla(247, 13%, 25%, 0.22)",
      },
      transition: {
        default: "all 0.2s ease",
      },
      size: {
        headerHeight: "80px",
      },
      shadow: {
        light: "0px 4px 35px 0px hsla(210, 5%, 67%, 0.19)",
        normal: "0px 4px 35px 0px hsla(210, 5%, 67%, 0.19)",
        raised: "0 0 10px 1px #ccc",
      },
    };
  };

  render() {
    return (
      <ThemeContext.Provider value={{ switchTheme: this.switchTheme }}>
        <StyledProvider theme={this.getTheme()}>
          {this.props.children}
        </StyledProvider>
      </ThemeContext.Provider>
    );
  }
}
