import React from "react";

import { ReactComponent as BrandLogo } from "../assets/brand.svg";
import { LoadingSpinner } from "./LoadingSpinner";

export class SplashScreen extends React.Component {
  render() {
    return (
      <div className="SplashScreenContainer">
        <BrandLogo width={100} height={100} />
        {this.props.error ? (
          <div>{this.props.error}</div>
        ) : (
          <LoadingSpinner size={60} />
        )}
      </div>
    );
  }
}
