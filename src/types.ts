import { CSSObject } from "styled-components"
import { RefCallback } from "react"

export type Orientation = 'horizontal' | 'vertical'

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

export type KeyboardPattern =
    | MenuPattern
    | ToolbarPattern
    | ListboxPattern
    | TabsPattern
    | GridPattern

export type BaseKeyboardNavProps = {
    /** Custom focus styles */
    focusStyle?: CSSObject
    /** Disable all keyboard navigation */
    disabled?: boolean
}

export type LinearNavProps = BaseKeyboardNavProps & {
    /** Called when focused index changes */
    onNavigate?: (index: number) => void
    /** Called when an item is activated (Enter/Space) */
    onActivate?: (index: number) => void
    /** Which item should be focused initially (default: 0) */
    defaultActiveIndex?: number
}

export type GridNavProps = BaseKeyboardNavProps & {
    /** Called when focused cell changes */
    onNavigate?: (row: number, column: number) => void
    /** Called when a cell is activated (Enter/Space) */
    onActivate?: (row: number, column: number) => void
}

// ============================================
// Props for withKeyboardNav HOC
// ============================================

export type KeyboardNavProps =
    | (MenuPattern & LinearNavProps)
    | (ToolbarPattern & LinearNavProps)
    | (ListboxPattern & LinearNavProps)
    | (TabsPattern & LinearNavProps)
    | (GridPattern & GridNavProps)

// ============================================
// Internal Component Props
// ============================================

export type PatternComponentProps<P extends KeyboardPattern> = P & {
    children?: React.ReactNode
    component: React.ComponentType<any>
    $focusStyles: any
} & (P extends GridPattern ? GridNavProps : LinearNavProps)


export type UseRovingFocusProps = {
    /** Number of items to navigate */
    count: number
    /** Navigation direction */
    orientation?: Orientation
    /** Wrap around at ends */
    loop?: boolean
    /** Called when focused index changes */
    onNavigate?: (index: number) => void
    /** Called when Enter/Space pressed */
    onActivate?: (index: number) => void
    /** Initial focused index (default: 0) */
    defaultActiveIndex?: number
}

// ============================================
// Hook Return Types
// ============================================

export type UseRovingFocus = {
    /** Currently focused index */
    activeIndex: number
    /** Programmatically set focused index */
    setActiveIndex: (index: number) => void
    /** Props to spread on each item */
    getItemProps: (index: number) => {
        tabIndex: number
        'data-active': boolean
        onFocus: () => void
        ref: RefCallback<HTMLElement>
    }
    /** Props to spread on container */
    containerProps: {
        onKeyDown: (e: React.KeyboardEvent) => void
    }
}

export type UseGridNavigation = {
    /** Currently focused row */
    activeRow: number
    /** Currently focused column */
    activeColumn: number
    /** Programmatically set focused cell */
    setActiveCell: (row: number, column: number) => void
    /** Props to spread on each cell */
    getCellProps: (row: number, column: number) => {
        tabIndex: number
        'data-active': boolean
        onFocus: () => void
        ref: RefCallback<HTMLElement>
    }
    /** Props to spread on container */
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