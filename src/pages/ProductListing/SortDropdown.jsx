import React from "react";
import {
  DropdownContainer,
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuBackdrop,
  Button,
} from "./ProductListing.ui";

export class SortDropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggleDropdown = () => {
    this.setState((prev) => ({ dropdownOpen: !prev.dropdownOpen }));
  };

  closeDropdown = () => {
    this.setState({ dropdownOpen: false });
  };

  render() {
    return (
      <DropdownContainer>
        <Button onClick={this.toggleDropdown}>
          {this.props.sortBy
            ? this.props.sortTitles[this.props.sortBy]
            : "None"}
        </Button>

        <DropdownMenu
          className={this.state.dropdownOpen ? "show" : ""}
          onClick={this.closeDropdown}
        >
          {this.props.sortOptions.map(({ id, f }) => (
            <DropdownMenuButton
              key={id}
              onClick={f}
              className={this.state.sortBy === id ? "selected" : ""}
            >
              {this.props.sortTitles[id]}
            </DropdownMenuButton>
          ))}
        </DropdownMenu>

        <DropdownMenuBackdrop
          show={this.state.dropdownOpen}
          onClick={this.closeDropdown}
        />
      </DropdownContainer>
    );
  }
}
