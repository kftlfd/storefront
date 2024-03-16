import { PureComponent } from 'react';

import {
  Button,
  DropdownContainer,
  DropdownMenu,
  DropdownMenuBackdrop,
  DropdownMenuButton,
} from './ProductListing.ui';

interface Props<SortValue extends string = string> {
  sortTitles: Record<SortValue, string>;
  sortBy: SortValue | null;
  sortOptions: { id: SortValue; f: () => void }[];
}

interface State {
  dropdownOpen: boolean;
}

export class SortDropdown extends PureComponent<Props, State> {
  constructor(props: Props) {
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
          {this.props.sortBy ? this.props.sortTitles[this.props.sortBy] : 'None'}
        </Button>

        <DropdownMenu
          className={this.state.dropdownOpen ? 'show' : ''}
          onClick={this.closeDropdown}
        >
          {this.props.sortOptions.map(({ id, f }) => (
            <DropdownMenuButton
              key={id}
              onClick={f}
              className={this.props.sortBy === id ? 'selected' : ''}
            >
              {this.props.sortTitles[id]}
            </DropdownMenuButton>
          ))}
        </DropdownMenu>

        <DropdownMenuBackdrop show={this.state.dropdownOpen} onClick={this.closeDropdown} />
      </DropdownContainer>
    );
  }
}
