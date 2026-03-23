# styled-components-keynav

🎹 Accessible keyboard navigation for styled-components — HOCs and hooks with WAI-ARIA compliance.

[![npm version](https://img.shields.io/npm/v/styled-components-keynav.svg)](https://www.npmjs.com/package/styled-components-keynav)
[![bundle size](https://img.shields.io/bundlephobia/minzip/styled-components-keynav)](https://bundlephobia.com/package/styled-components-keynav)
[![license](https://img.shields.io/npm/l/styled-components-keynav.svg)](./LICENSE)

## Features

- 🎨 **Built for styled-components** — First-class HOC integration
- 🎹 **Full keyboard support** — Arrow keys, Home, End, Tab, Enter, Escape
- ♿ **WAI-ARIA compliant** — Follows [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- 🪶 **Lightweight** — Zero dependencies beyond peer deps (~2kb gzipped)
- 🔄 **Flexible patterns** — Menus, toolbars, grids, listboxes, and custom patterns
- 📦 **TypeScript first** — Full type safety out of the box

## Installation

```bash
npm install styled-components-keynav styled-components
```

> **Peer Dependencies:** React 18+ and styled-components 5.x or 6.x

## Quick Start

### Using the HOC

Wrap any styled-component to add keyboard navigation:

```tsx
import styled from 'styled-components';
import { withKeyboardNav } from 'styled-components-keynav';

const Menu = styled.ul`
  list-style: none;
  padding: 8px;
  background: #1a1a1a;
  border-radius: 8px;
`;

const MenuItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  
  &:focus {
    background: #3b82f6;
    outline: none;
  }
`;

const KeyboardMenu = withKeyboardNav(Menu, {
  pattern: 'menu',
  orientation: 'vertical',
  loop: true,
});

function App() {
  return (
    <KeyboardMenu>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Paste</MenuItem>
    </KeyboardMenu>
  );
}
```

**Result:** Users can navigate with `↑`/`↓` arrow keys, select with `Enter`, and focus loops from last to first item.

### Using the Hook

For more control, use the hook directly:

```tsx
import styled from 'styled-components';
import { useKeyboardNav } from 'styled-components-keynav';

const ToolbarContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const ToolbarButton = styled.button<{ $focused?: boolean }>`
  padding: 8px;
  background: ${({ $focused }) => ($focused ? '#3b82f6' : '#262626')};
  border: none;
  color: white;
  border-radius: 4px;
`;

function Toolbar() {
  const { containerProps, getItemProps, focusedIndex } = useKeyboardNav({
    pattern: 'toolbar',
    orientation: 'horizontal',
    itemCount: 3,
  });

  const items = ['Bold', 'Italic', 'Underline'];

  return (
    <ToolbarContainer role="toolbar" {...containerProps}>
      {items.map((label, index) => (
        <ToolbarButton
          key={label}
          $focused={focusedIndex === index}
          {...getItemProps(index)}
        >
          {label}
        </ToolbarButton>
      ))}
    </ToolbarContainer>
  );
}
```

## API Reference

### `withKeyboardNav(Component, options)`

Higher-order component that wraps a styled-component with keyboard navigation.

```tsx
const KeyboardList = withKeyboardNav(StyledList, options);
```

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `pattern` | `'menu' \| 'toolbar' \| 'listbox' \| 'grid' \| 'custom'` | `'menu'` | Navigation pattern |
| `orientation` | `'horizontal' \| 'vertical' \| 'both'` | `'vertical'` | Arrow key direction |
| `loop` | `boolean` | `false` | Wrap focus at boundaries |
| `initialIndex` | `number` | `0` | Initially focused index |
| `itemSelector` | `string` | `'> *'` | CSS selector for navigable children |
| `onSelect` | `(index: number, event: KeyboardEvent) => void` | — | Selection callback |
| `onEscape` | `() => void` | — | Escape key callback |
| `disabled` | `boolean` | `false` | Disable navigation |
| `typeahead` | `boolean` | `false` | Enable type-to-select |

### `useKeyboardNav(options)`

Hook for custom implementations.

```tsx
const {
  containerProps,  // Spread on container element
  getItemProps,    // Get props for each item by index
  focusedIndex,    // Current focus position
  setFocusedIndex, // Imperatively set focus
  reset,           // Reset to initial state
} = useKeyboardNav(options);
```

## Patterns

### Menu

```tsx
// Vertical navigation: ↑/↓, select: Enter, close: Escape
const KeyboardMenu = withKeyboardNav(Menu, {
  pattern: 'menu',
  orientation: 'vertical',
  loop: true,
  onEscape: () => closeMenu(),
});
```

### Toolbar

```tsx
// Horizontal navigation: ←/→, activate: Enter/Space
const KeyboardToolbar = withKeyboardNav(Toolbar, {
  pattern: 'toolbar',
  orientation: 'horizontal',
});
```

### Listbox (with typeahead)

```tsx
// Type characters to jump to matching items
const KeyboardListbox = withKeyboardNav(Listbox, {
  pattern: 'listbox',
  typeahead: true,
});
```

### Grid

```tsx
// 2D navigation: ←/→/↑/↓
const KeyboardGrid = withKeyboardNav(Grid, {
  pattern: 'grid',
  orientation: 'both',
  columns: 3,
});
```

## Styling Focus States

styled-components-keynav uses the [roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex) pattern. Style focus states with CSS:

```tsx
const MenuItem = styled.li`
  /* Keyboard focus */
  &:focus {
    background: #3b82f6;
    outline: 2px solid #60a5fa;
    outline-offset: -2px;
  }

  /* Focus-visible for keyboard-only focus */
  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid #60a5fa;
  }
`;
```

## Advanced Usage

### Custom Key Bindings

```tsx
const VimMenu = withKeyboardNav(Menu, {
  pattern: 'custom',
  keyMap: {
    next: ['ArrowDown', 'j'],
    prev: ['ArrowUp', 'k'],
    first: ['Home', 'g'],
    last: ['End', 'G'],
    select: ['Enter', 'l'],
  },
});
```

### Disabled Items

```tsx
const KeyboardMenu = withKeyboardNav(Menu, {
  pattern: 'menu',
  isItemDisabled: (index, element) => element.hasAttribute('aria-disabled'),
});
```

### Nested Menus

```tsx
const KeyboardMenu = withKeyboardNav(Menu, {
  pattern: 'menu',
  orientation: 'vertical',
  onSelect: (index) => {
    if (hasSubmenu(index)) {
      openSubmenu(index);
    }
  },
  keyMap: {
    openSubmenu: ['ArrowRight', 'Enter'],
    closeSubmenu: ['ArrowLeft', 'Escape'],
  },
});
```

## Accessibility

This library implements WAI-ARIA Authoring Practices:

| Pattern | Spec |
|---------|------|
| Menu | [APG Menu Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu/) |
| Toolbar | [APG Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| Listbox | [APG Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) |
| Grid | [APG Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) |
