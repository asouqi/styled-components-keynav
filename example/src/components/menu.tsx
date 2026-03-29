import styled from "styled-components";
import {withKeyboardNav} from "../../../src/withKeyboardNav";

const Menu = styled.ul`
  list-style: none;
  padding: 4px;
  background: white;
  border: 1px solid #ccc;
`;

const MenuItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid blue;
  }

  &[data-active='true'] {
    background: #e3f2fd;
  }
`;

const KeyboardMenu = withKeyboardNav(Menu, {
    pattern: 'menu',
    orientation: 'vertical',
    loop: true,
});

export function DropdownMenu() {
    return (
        <KeyboardMenu role="menu">
            <MenuItem role="menuitem">New File</MenuItem>
            <MenuItem role="menuitem">Open</MenuItem>
            <MenuItem role="menuitem">Save</MenuItem>
            <MenuItem role="menuitem">Exit</MenuItem>
        </KeyboardMenu>
    );
}
