import styled from 'styled-components'
import {withKeyboardNav} from "../../../src/withKeyboardNav";
import {useState} from "react";

// 1. Create styled components
const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
`

const Tab = styled.button`
  padding: 12px 24px;
  border: none;
  background: transparent;
  cursor: pointer;

  &[data-active="true"] {
    border-bottom: 2px solid blue;
  }
`

const TabPanel = styled.div`
  padding: 16px;
`

// 2. Wrap with keyboard navigation
const KeyboardTabList = withKeyboardNav(Tabs, {
    pattern: 'tabs',
    orientation: 'horizontal',
    activationMode: 'manual',  // 'manual' = Enter to select, 'automatic' = select on focus
    loop: true,
})

// 3. Use in your app
export function TabList() {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <>
            <KeyboardTabList
                role="tablist"
                onActivate={(index) => setActiveTab(index)}  // Called when Enter/Space pressed
                defaultActiveIndex={0}
            >
                <Tab role="tab" aria-selected={activeTab === 0}>Home</Tab>
                <Tab role="tab" aria-selected={activeTab === 1}>Profile</Tab>
                <Tab role="tab" aria-selected={activeTab === 2}>Settings</Tab>
            </KeyboardTabList>

            <TabPanel role="tabpanel" hidden={activeTab !== 0}>Home content</TabPanel>
            <TabPanel role="tabpanel" hidden={activeTab !== 1}>Profile content</TabPanel>
            <TabPanel role="tabpanel" hidden={activeTab !== 2}>Settings content</TabPanel>
        </>
    )
}