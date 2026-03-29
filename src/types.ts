import { CSSObject } from "styled-components"
import { RefCallback } from "react"

export type Orientation = 'horizontal' | 'vertical'

// ============================================
// Pattern Types
// ============================================

export type MenuPattern = {
    pattern: 'menu'
    orientation?: Orientation
    loop?: boolean
}

export type ToolbarPattern = {
    pattern: 'toolbar'
    orientation?: Orientation
    loop?: boolean
}

export type ListboxPattern = {
    pattern: 'listbox'
    orientation?: Orientation
    loop?: boolean
}

export type TabsPattern = {
    pattern: 'tabs'
    orientation?: Orientation
    loop?: boolean
    /** 'automatic' = select on focus, 'manual' = select on Enter/Space */
    activationMode?: 'automatic' | 'manual'
}

export type GridPattern = {
    pattern: 'grid'
    rows: number
    columns: number
    loop?: boolean
}

// ============================================
// Union of All Patterns
// ============================================

export type KeyboardPattern =
    | MenuPattern
    | ToolbarPattern
    | ListboxPattern
    | TabsPattern
    | GridPattern

// ============================================
// Props for withKeyboardNav HOC
// ============================================

export type KeyboardNavProps = KeyboardPattern & {
    /** Custom focus styles */
    focusStyle?: CSSObject
    /** Called when focused index changes (arrow keys move focus) */
    onNavigate?: (index: number) => void
    /** Called when an item is activated (Enter/Space pressed) */
    onActivate?: (index: number) => void
    /** Disable all keyboard navigation */
    disabled?: boolean
    /** Which item should be focused initially (default: 0) */
    defaultActiveIndex?: number
}

// Grid-specific props (extends base props with row/column callbacks)
export type GridNavProps = Omit<KeyboardNavProps, 'onNavigate' | 'onActivate'> & {
    pattern: 'grid'
    /** Called when focused cell changes */
    onNavigate?: (row: number, column: number) => void
    /** Called when a cell is activated */
    onActivate?: (row: number, column: number) => void
}

// ============================================
// Hook Return Types
// ============================================

export type UseRovingFocus = {
    activeIndex: number
    setActiveIndex: (index: number) => void
    getItemProps: (index: number) => {
        tabIndex: number
        'data-active': boolean
        onFocus: () => void
        ref: RefCallback<HTMLElement>
    }
    containerProps: {
        onKeyDown: (e: React.KeyboardEvent) => void
    }
}

export type UseGridNavigation = {
    activeRow: number
    activeColumn: number
    activeIndex: number
    setActiveCell: (row: number, column: number) => void
    getCellProps: (index: number) => {
        tabIndex: number
        'data-active': boolean
        'data-row': number
        'data-column': number
        onFocus: () => void
        ref: RefCallback<HTMLElement>
    }
    containerProps: {
        role: 'grid'
        onKeyDown: (e: React.KeyboardEvent) => void
    }
}

export type UseFocusTrap = {
    containerRef: React.RefObject<HTMLElement>
    activate: () => void
    deactivate: () => void
    isActive: boolean
}