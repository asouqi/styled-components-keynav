import React, { forwardRef } from "react"
import { KeyboardNavProps } from "./types"
import styled, { css } from "styled-components"
import { useRovingFocus } from "./hooks/useRovingFocus";

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
    type OriginalProps = React.ComponentProps<T>
    type EnhancedProps = OriginalProps

    const { focusStyle, onNavigate, onActivate, defaultActiveIndex = 0 } = keyProps
    const focusStyles = focusStyle
        ? css`
        &:focus,
        &:focus-visible {
          ${focusStyle}
        }
      `
        : css`
        &:focus-visible {
          outline: 3px solid currentColor;
          outline-offset: 2px;
        }
      `

    const StyledBase = styled(component as React.ComponentType)`${focusStyles}`

   const KeyboardNavComponent = forwardRef<HTMLElement, EnhancedProps>(({children, ...props}, ref) => {
       // TODO:: we need to improve that to handle cases with complex structure, add multiple strategy detection
       const count = React.Children.count(children)
       const { getItemProps, containerProps } = useRovingFocus({
           count,
           orientation: 'orientation' in keyProps ? keyProps.orientation : 'vertical',
           loop: 'loop' in keyProps ? keyProps.loop : true,
           onNavigate,
           onActivate,
           defaultActiveIndex,
           // TODO:: do we need to add onNavigate callback
       })
       const childrenWithKeyboardNav = React.Children.map(children, (child, index) => {
           if (!React.isValidElement(child as React.ReactNode)) return child
           return React.cloneElement(
               child as React.ReactNode,
               {...getItemProps(index)}
           )
       })
       return <StyledBase ref={ref} {...containerProps} children={childrenWithKeyboardNav} {...props} />
   })

    KeyboardNavComponent.displayName = `withKeyboardNav(${
        (component as { displayName?: string; name?: string }).displayName ||
        (component as { displayName?: string; name?: string }).name ||
        'Component'
    })`

    return KeyboardNavComponent
}
