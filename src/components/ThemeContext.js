import React from "react";
import { connect } from "react-redux";
import { ThemeProvider as StyledProvider } from "styled-components";

import { switchTheme } from "../store/settings";

export const ThemeContext = React.createContext();

class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      variant: this.props.theme,
    };
  }

  switchTheme = () => {
    this.setState((prev) => ({
      variant: prev.variant === "light" ? "dark" : "light",
    }));
    this.props.switchTheme();
  };

  getTheme = () => {
    const light = this.state.variant === "light";
    return {
      color: {
        bg: light ? "#fff" : "#1D1F22",
        bgHover: light ? "#eee" : "#444",
        accent: "#5ECE7B",
        accentHover: "#92DDA6",
        text: light ? "#1D1F22" : "#bfbfbf",
        backdrop: light ? "hsla(247, 13%, 25%, 0.22)" : "hsla(0, 0%, 0%, 0.4)",
      },
      transition: {
        default: "all 0.2s ease",
      },
      size: {
        pageInlinePadding: "max((100vw - 1200px) / 2, 1rem)",
        headerHeight: "60px",
        headerBtnSpacing: "6px",
        borderRadius: "3px",
      },
      shadow: {
        lighter: light
          ? "0 0 20px 5px hsla(0, 0%, 50%, 0.1)"
          : "0 0 20px 10px hsla(0, 0%, 60%, 0.1)",
        normal: light
          ? "0 0 20px 5px hsla(0, 0%, 50%, 0.2)"
          : "0 0 20px 10px hsla(0, 0%, 90%, 0.15)",
        darker: light
          ? "0 0 20px 5px hsla(0, 0%, 50%, 0.3)"
          : "0 0 35px 5px hsla(0, 0%, 60%, 0.2)",
      },
      img: {
        filter: light ? "invert(25%)" : "invert(75%)",
      },
    };
  };

  render() {
    const contextVal = {
      switchTheme: this.switchTheme,
      variant: this.state.variant,
    };

    return (
      <ThemeContext.Provider value={contextVal}>
        <StyledProvider theme={this.getTheme()}>
          {this.props.children}
        </StyledProvider>
      </ThemeContext.Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.settings.theme,
});

const mapDispatchToProps = (dispatch) => ({
  switchTheme: () => dispatch(switchTheme()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider);
