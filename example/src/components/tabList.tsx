import {withKeyboardNav} from "../../../src/withKeyboardNav";
import styled from "styled-components";

const TabList = styled.div`
  display: flex;
  border-bottom: 2px solid #ddd;
`;

const Tab = styled.button`
  padding: 12px 20px;
  border: none;
  background: none;
  border-bottom: 2px solid transparent;
  
  &:focus-visible {
    outline: 2px solid blue;
  }
  
  &[data-active='true'] {
    border-bottom-color: blue;
    font-weight: bold;
  }
`;

const KeyboardTabs = withKeyboardNav(TabList, {
    pattern: 'tabs',
    orientation: 'horizontal',
    activationMode: 'manual', // Tab activates on Enter/Space, not automatically
    loop: false,
    onActivate: (index) => console.log(index)
});

export function TabNavigation() {
    return (
        <KeyboardTabs role="tablist">
            <Tab role="tab">Overview</Tab>
            <Tab role="tab">Details</Tab>
            <Tab role="tab">Settings</Tab>
        </KeyboardTabs>
    );
}
