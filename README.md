# styled-components-keynav

A lightweight library that adds **WAI-ARIA compliant keyboard navigation** to your styled-components with a simple HOC.

## Features

- 🎹 **Full keyboard support** - Arrow keys, Home, End, Enter, Space
- ♿ **ARIA compliant** - Follows WAI-ARIA design patterns
- 🎨 **Styled-components native** - Works seamlessly with styled-components
- 📦 **Tiny footprint** - No external dependencies
- 🔧 **TypeScript first** - Full type safety

## Installation

```bash
npm install styled-components-keynav styled-components
# or
pnpm add styled-components-keynav styled-components
```

## Quick Start

```tsx
import styled from 'styled-components'
import { withKeyboardNav } from 'styled-components-keynav'

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`

const MenuItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
`

// Add keyboard navigation with one line
const KeyboardMenu = withKeyboardNav(MenuList, { pattern: 'menu' })

function App() {
  return (
    <KeyboardMenu onActivate={(index) => console.log(`Selected: ${index}`)}>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Paste</MenuItem>
    </KeyboardMenu>
  )
}
```

## Patterns

### Menu

Vertical navigation for dropdown menus and context menus.

```tsx
const Menu = withKeyboardNav(MenuList, {
  pattern: 'menu',
  orientation: 'vertical', // default
  loop: true,              // default
})
```

**Keyboard:** `↑` `↓` `Home` `End` `Enter` `Space`

### Toolbar

Horizontal navigation for button groups and action bars.

```tsx
const Toolbar = withKeyboardNav(ToolbarContainer, {
  pattern: 'toolbar',
  orientation: 'horizontal',
})
```

**Keyboard:** `←` `→` `Home` `End` `Enter` `Space`

### Tabs

Tab list navigation with automatic or manual activation.

```tsx
const TabList = withKeyboardNav(TabContainer, {
  pattern: 'tabs',
  orientation: 'horizontal',
  activationMode: 'automatic', // or 'manual'
})
```

**Keyboard:** `←` `→` `Home` `End` `Enter` `Space`

### Listbox

Single-select list navigation.

```tsx
const Listbox = withKeyboardNav(ListContainer, {
  pattern: 'listbox',
  orientation: 'vertical',
})
```

**Keyboard:** `↑` `↓` `Home` `End` `Enter` `Space`

### Grid

2D grid navigation for calendars, data grids, etc.

```tsx
const Grid = withKeyboardNav(GridContainer, {
  pattern: 'grid',
  rows: 4,
  columns: 7,
  loop: false,
})
```

**Keyboard:** `↑` `↓` `←` `→` `Home` `End` `Ctrl+Home` `Ctrl+End` `PageUp` `PageDown`

## API

### `withKeyboardNav(component, options)`

Wraps a styled-component with keyboard navigation.

#### Options

| Option | Type | Default | Patterns | Description |
|--------|------|---------|----------|-------------|
| `pattern` | `'menu' \| 'toolbar' \| 'listbox' \| 'tabs' \| 'grid'` | required | all | Navigation pattern |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | menu, toolbar, listbox, tabs | Arrow key direction |
| `loop` | `boolean` | `true` | all | Wrap around at edges |
| `activationMode` | `'automatic' \| 'manual'` | `'manual'` | tabs | When to activate tabs |
| `rows` | `number` | required | grid | Number of rows |
| `columns` | `number` | required | grid | Number of columns |
| `focusStyle` | `CSSObject` | outline | all | Custom focus styles |
| `onNavigate` | `(index) => void` | - | all | Called on focus change |
| `onActivate` | `(index) => void` | - | all | Called on Enter/Space |
| `defaultActiveIndex` | `number` | `0` | all | Initial focused index |

## Hooks

For advanced use cases, you can use the underlying hooks directly:

### `useFocusTrap`

Traps focus within a container - essential for modals, dialogs, and dropdowns. Automatically restores focus to the previously focused element when deactivated.

```tsx
import { useFocusTrap } from 'styled-components-keynav'

function Modal({ isOpen, onClose, children }) {
  const { containerRef, activate, deactivate, isActive } = useFocusTrap()

  useEffect(() => {
    if (isOpen) {
      activate()
    } else {
      deactivate()
    }
  }, [isOpen, activate, deactivate])

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isActive, onClose])

  if (!isOpen) return null

  return (
    <Overlay onClick={onClose}>
      <Dialog ref={containerRef} onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </Dialog>
    </Overlay>
  )
}
```

**Features:**
- Tab cycles through focusable elements within the container
- Shift+Tab cycles

### `useRovingFocus`

Roving tabindex for 1D navigation (menus, toolbars, listboxes).

```tsx
import { useRovingFocus } from 'styled-components-keynav'

function CustomMenu({ items }) {
  const { getItemProps, containerProps } = useRovingFocus({
    count: items.length,
    orientation: 'vertical',
    onActivate: (index) => items[index].action(),
  })

  return (
    <ul {...containerProps}>
      {items.map((item, i) => (
        <li key={i} {...getItemProps(i)}>{item.label}</li>
      ))}
    </ul>
  )
}
```

### `useGridNavigation`

2D grid navigation for calendars, spreadsheets, image galleries.

```tsx
import { useGridNavigation } from 'styled-components-keynav'

function Calendar({ days }) {
  const { getCellProps, containerProps } = useGridNavigation({
    rows: 5,
    columns: 7,
    onActivate: (row, col) => selectDate(row * 7 + col),
  })

  return (
    <div {...containerProps}>
      {days.map((week, row) => (
        <div key={row}>
          {week.map((day, col) => (
            <button key={col} {...getCellProps(row, col)}>{day}</button>
          ))}
        </div>
      ))}
    </div>
  )
}
```

## Peer Dependencies

- `react` >= 18
- `styled-components` >= 6
