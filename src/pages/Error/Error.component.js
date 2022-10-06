import React from "react";

export default class ErrorPage extends React.Component {
  componentDidMount() {
    window.scroll(0, 0);
    document.title = "Cart";
  }

  render() {
    return (
      <div className="PageWrapper">
        <div className="PageMainText">Page not found</div>
      </div>
    );
  }
}
