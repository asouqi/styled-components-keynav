import './App.css'
import styled, { ThemeProvider } from "styled-components";
import {withKeyboardNav} from "../../src/withKeyboardNav";
import {useRovingFocus} from "../../src/hooks/useRovingFocus";
import {useState} from "react";
import {useFocusTrap} from "../../src/hooks/useFocusTrap";
import {EditorToolbar} from "./components/toolbar";
import {TabNavigation} from "./components/tabList";

function SimpleMenu() {
    const items = ['Edit', 'Copy', 'Delete']

    const { getItemProps, containerProps } = useRovingFocus({
        count: items.length,
        orientation: 'horizontal', // or 'horizontal'
        loop: true,             // wrap around at edges
    });

    return (
        <div {...containerProps}>
            {items.map((item, i) => (
                <div {...getItemProps(i)}>
                    {item}
                </div>
            ))}
        </div>
    );
}


function SimpleModal() {
    const [open, setOpen] = useState(false);
    const { containerRef, activate, deactivate } = useFocusTrap()

    const handleOpen = () => {
        setOpen(true);
        setTimeout(activate, 0); // activate after render
    };

    const handleClose = () => {
        deactivate(); // restores focus
        setOpen(false);
    };

    return (
        <>
            <button onClick={handleOpen}>Open</button>

            {open && (
                <div ref={containerRef}>
                    <input placeholder="First name" />
                    <input placeholder="Last name" />
                    <button onClick={handleClose}>Close</button>
                </div>
            )}
        </>
    );
}

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

function DropdownMenu() {
    return (
        <KeyboardMenu role="menu">
            <MenuItem role="menuitem">New File</MenuItem>
            <MenuItem role="menuitem">Open</MenuItem>
            <MenuItem role="menuitem">Save</MenuItem>
            <MenuItem role="menuitem">Exit</MenuItem>
        </KeyboardMenu>
    );
}


function App() {

    return <div><TabNavigation/></div>
}

export default App
