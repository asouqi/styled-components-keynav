import {CSSObject} from "styled-components";
import {RefCallback} from "react";

export type Orientation = 'horizontal' | 'vertical'

export type DropDownPattern = {
    pattern: 'dropdown'
    orientation?: Orientation
    loop?: boolean
}

export type TabsPattern = {
    pattern: 'tabs'
    activationMode?: 'automatic' | 'manual'
    orientation?: Orientation
    loop?: boolean
}

export type AccordionPattern = {
    pattern: 'accordion'
    multiExpand?: boolean
    loop?: boolean
}

export type MenuPattern = {
    pattern: 'menu'
    orientation?: Orientation
    loop?: boolean
}

export type GridPattern = {
    pattern: 'grid'
    loop?: boolean
}

export type ButtonPattern = {
    pattern: 'button'
}

export type KeyboardPatter =
    | DropDownPattern
    | TabsPattern
    | AccordionPattern
    | MenuPattern
    | GridPattern
    | ButtonPattern

export type KeyboardNavProps = KeyboardPatter & {
    focusStyle?: CSSObject
    /** Called when focused index changes (arrow keys move focus) */
    onNavigate?: (index: number) => void;
    /** Called when an item is activated (Enter/Space pressed) */
    onActivate?: (index: number) => void;
    /** Disable all keyboard navigation */
    disabled?: boolean;
    /** Which item should be focused initially (default: 0) */
    defaultActiveIndex?: number;
}

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

export type UseFocusTrap = {
    containerRef: React.RefObject<HTMLElement>
    activate: () => void
    deactivate: () => void
    isActive: boolean
}
