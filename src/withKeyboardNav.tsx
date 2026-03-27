import React  from "react"
import { KeyboardNavProps } from "./types"
import PatternFactory from "./pattern/PatternFactory"

/**
 * HOC that warps styled-component to add keyboard navigation behavior, determined by the props.
 * @example
 * const MyMenu = styled.ul`...`;
 * const KeyboardMenu = withKeyboardNav(MyMenu, {
 *     pattern: 'menu',
 *     orientation: 'horizontal',
 *     loop: false
 * })
 */
export function withKeyboardNav<T extends React.ComponentType<React.ComponentProps<T>>>(component: T, keyProps: KeyboardNavProps) {
    const KeyboardNavComponent = PatternFactory(component, keyProps)

    KeyboardNavComponent.displayName = `withKeyboardNav(${
        (component as { displayName?: string; name?: string }).displayName ||
        (component as { displayName?: string; name?: string }).name ||
        'Component'
    })`

    return KeyboardNavComponent
}
