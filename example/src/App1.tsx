import './App.css'
import styled, { ThemeProvider } from "styled-components";
import {withKeyboardNav} from "../../src/withKeyboardNav";
import {useState} from "react";
import {useRovingFocus} from "../../src/hooks/useRovingFocus";
import { Sidebar } from "./components";


const theme = {
    ink: '#0c0c0e',
    paper: '#f5f4f0',
    accent: '#b83d10',
    accentDim: '#f0e0d8',
    border: '#d0ceca',
    muted: '#595651',
    sans: "'Syne', sans-serif",
    mono: "'JetBrains Mono', monospace",
}

const Page = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;
`;

const Main = styled.main`
  padding: 48px 64px;
  display: flex;
  flex-direction: column;
  gap: 80px;
  max-width: 860px;
`;



// ─── Example 1: Menu ─────────────────────────────────────────────────────────

const StyledMenuList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px;
  background: white;
  border: 1px solid ${({theme}) => theme.border};
  border-radius: 10px;
  width: 200px;
  box-shadow: 0 4px 24px ${({theme}) => theme.border};
`;

const StyledMenuItem = styled.li`
  font-family: ${({theme}) => theme.sans};
  font-size: 13px;
  font-weight: 500;
  color: ${({theme}) => theme.ink};
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.1s;

  &:hover {
    background: ${({theme}) => theme.accentDim};
    color: ${({theme}) => theme.accent};
  }

  &[data-active='true'] {
    background: ${({theme}) => theme.accentDim};
    color: ${({theme}) => theme.accent};
    outline: 1.5px solid ${({theme}) => theme.accent};
    outline-offset: -1.5px;
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  background: ${({theme}) => theme.border};
  margin: 2px 0;
`;

const KeyboardMenuList = withKeyboardNav(StyledMenuList, {
    pattern: 'menu',
    orientation: 'vertical',
    loop: true,
});

function MenuExample() {
    const items = [
        { label: 'View profile', kbd: '⌘P' },
        { label: 'Settings', kbd: '⌘,' },
        { label: 'Billing', kbd: null },
    ];

    return (
        <KeyboardMenuList role="menu" aria-label="User menu">
            {items.map(item => (
                <StyledMenuItem key={item.label} role="menuitem" tabIndex={-1}>
                    {item.label}
                    {item.kbd && <KbdBadge>{item.kbd}</KbdBadge>}
                </StyledMenuItem>
            ))}
            <MenuDivider />
            <StyledMenuItem
                role="menuitem"
                tabIndex={-1}
                style={{ color: '#c0392b' }}
            >
                Sign out
            </StyledMenuItem>
        </KeyboardMenuList>
    );
}



// ─── Example 2: Tabs ─────────────────────────────────────────────────────────

const TabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledTabList = styled.div`
  display: flex;
  border-bottom: 1px solid ${({theme}) => theme.border};
`;

const StyledTab = styled.button<{ $active: boolean }>`
  font-family: ${({theme}) => theme.sans};
  font-size: 13px;
  font-weight: ${p => (p.$active ? '600' : '400')};
  color: ${({theme, $active}) => ($active ? theme.ink : theme.muted)};
  background: none;
  border: none;
  border-bottom: 2px solid ${({theme, $active}) => ($active ? theme.accent : 'transparent')};
  padding: 10px 16px;
  cursor: pointer;
  margin-bottom: -1px;
  transition: all 0.15s;

  &:hover { color: ${({theme}) => theme.ink}; }

  &[data-active='true'] {
    color: ${({theme}) => theme.ink};
    border-bottom-color: ${({theme}) => theme.accent};
  }

  &:focus-visible {
    outline: 2px solid ${({theme}) => theme.accent};
    outline-offset: -2px;
    border-radius: 4px 4px 0 0;
  }
`;

const TabPanel = styled.div`
  padding: 20px 0;
  font-family: ${({theme}) => theme.sans};
  font-size: 13px;
  color: ${({theme}) => theme.muted};
  line-height: 1.6;
`;

const tabs = [
    { label: 'Overview', content: 'General information about the project and its current status.' },
    { label: 'Analytics', content: 'Usage metrics, performance data, and user engagement stats.' },
    { label: 'Settings', content: 'Configure preferences, integrations, and access controls.' },
];

function TabsExample() {
    const { activeIndex, getItemProps, containerProps } = useRovingFocus({
        count: tabs.length,
        orientation: 'horizontal',
        loop: true,
    });

    return (
        <TabsWrapper>
            <StyledTabList role="tablist" {...containerProps}>
                {tabs.map((tab, i) => (
                    <StyledTab
                        key={tab.label}
                        role="tab"
                        $active={i === activeIndex}
                        aria-selected={i === activeIndex}
                        {...getItemProps(i)}
                    >
                        {tab.label}
                    </StyledTab>
                ))}
            </StyledTabList>
            <TabPanel role="tabpanel">{tabs[activeIndex].content}</TabPanel>
        </TabsWrapper>
    );
}

function App1() {

  return (
      <ThemeProvider theme={theme}>
          <Page>
              <Sidebar/>

              <Main>
                  {/* ── Menu ── */}
                  <Section id="menu">
                      <SectionHeader>
                          <SectionEyebrow>withKeyboardNav · pattern: menu</SectionEyebrow>
                          <SectionTitle>Menu</SectionTitle>
                          <SectionDesc>
                              Wrap any styled list with <Mono>withKeyboardNav</Mono> to get full
                              arrow key navigation, roving tabIndex, and focus loop — zero extra
                              code in your component.
                          </SectionDesc>
                      </SectionHeader>

                      <HintRow>
                          <Hint><kbd>↑</kbd><kbd>↓</kbd> navigate items</Hint>
                          <Hint><kbd>Home</kbd> first item</Hint>
                          <Hint><kbd>End</kbd> last item</Hint>
                      </HintRow>

                      <DemoRow>
                          <DemoBox>
                              <DemoBoxLabel>Live demo — click to focus, then use keyboard</DemoBoxLabel>
                              <MenuExample />
                          </DemoBox>
                          <DemoBox>
                              <DemoBoxLabel>Usage</DemoBoxLabel>
                              <CodeBlock>{`const KeyboardMenu = withKeyboardNav(
  StyledMenu,
  {
    pattern: 'menu',
    orientation: 'vertical',
    loop: true,
  }
);

<KeyboardMenu role="menu">
  <StyledItem role="menuitem">
    View profile
  </StyledItem>
  <StyledItem role="menuitem">
    Settings
  </StyledItem>
</KeyboardMenu>`}</CodeBlock>
                          </DemoBox>
                      </DemoRow>
                  </Section>

              </Main>
          </Page>
      </ThemeProvider>
  )
}

export default App1
