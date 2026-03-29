import './App.css'
import styled from 'styled-components'

import { DropdownMenu } from './components/menu'
import { TabList } from './components/tabs'
import { CountryPicker } from './components/listbox'
import { Calendar, ImageGallery } from './components/grid'
import { EditorToolbar } from './components/toolbar'

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 8px;
`

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 48px;
`

const Section = styled.section`
  margin-bottom: 48px;
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 8px;
  color: #333;
`

const SectionDescription = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 16px;
`

const KeyboardHint = styled.div`
  background: #f5f5f5;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #666;
  margin-top: 12px;
  
  kbd {
    background: white;
    padding: 2px 6px;
    border-radius: 3px;
    border: 1px solid #ddd;
    font-family: monospace;
    margin: 0 2px;
  }
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 48px 0;
`

function App() {
    return (
        <AppContainer>
            <Title>styled-components-keynav</Title>
            <Subtitle>
                Keyboard navigation patterns for styled-components
            </Subtitle>

            {/* Menu Pattern */}
            <Section>
                <SectionTitle>Menu</SectionTitle>
                <SectionDescription>
                    Vertical navigation menu with arrow key support
                </SectionDescription>
                <DropdownMenu />
                <KeyboardHint>
                    <kbd>↑</kbd> <kbd>↓</kbd> Navigate items •
                    <kbd>Home</kbd> <kbd>End</kbd> Jump to first/last •
                    <kbd>Enter</kbd> <kbd>Space</kbd> Activate
                </KeyboardHint>
            </Section>

            <Divider />

            {/* Toolbar Pattern */}
            <Section>
                <SectionTitle>Toolbar</SectionTitle>
                <SectionDescription>
                    Horizontal toolbar with keyboard navigation
                </SectionDescription>
                <EditorToolbar />
                <KeyboardHint>
                    <kbd>←</kbd> <kbd>→</kbd> Navigate buttons •
                    <kbd>Home</kbd> <kbd>End</kbd> Jump to first/last •
                    <kbd>Enter</kbd> <kbd>Space</kbd> Activate
                </KeyboardHint>
            </Section>

            <Divider />

            {/* Tabs Pattern */}
            <Section>
                <SectionTitle>Tabs</SectionTitle>
                <SectionDescription>
                    Tab navigation with manual activation mode
                </SectionDescription>
                <TabList />
                <KeyboardHint>
                    <kbd>←</kbd> <kbd>→</kbd> Navigate tabs •
                    <kbd>Enter</kbd> <kbd>Space</kbd> Select tab (manual mode)
                </KeyboardHint>
            </Section>

            <Divider />

            {/* Listbox Pattern */}
            <Section>
                <SectionTitle>Listbox</SectionTitle>
                <SectionDescription>
                    Single-select list with keyboard navigation
                </SectionDescription>
                <CountryPicker />
                <KeyboardHint>
                    <kbd>↑</kbd> <kbd>↓</kbd> Navigate options •
                    <kbd>Home</kbd> <kbd>End</kbd> Jump to first/last •
                    <kbd>Enter</kbd> <kbd>Space</kbd> Select option
                </KeyboardHint>
            </Section>

            <Divider />

            {/* Grid Pattern - Calendar */}
            <Section>
                <SectionTitle>Grid (Calendar)</SectionTitle>
                <SectionDescription>
                    2D grid navigation for calendar-style layouts
                </SectionDescription>
                <Calendar />
                <KeyboardHint>
                    <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> Navigate cells •
                    <kbd>Home</kbd> First in row • <kbd>End</kbd> Last in row •
                    <kbd>Ctrl+Home</kbd> First cell • <kbd>Ctrl+End</kbd> Last cell
                </KeyboardHint>
            </Section>

            <Divider />

            {/* Grid Pattern - Image Gallery */}
            <Section>
                <SectionTitle>Grid (Image Gallery)</SectionTitle>
                <SectionDescription>
                    Navigate images and press Enter to open lightbox
                </SectionDescription>
                <ImageGallery />
                <KeyboardHint>
                    <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> Navigate images •
                    <kbd>Enter</kbd> Open lightbox •
                    <kbd>Esc</kbd> Close lightbox
                </KeyboardHint>
            </Section>
        </AppContainer>
    )
}

export default App