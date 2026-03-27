import React, {forwardRef} from "react"
import { KeyboardNavProps } from "../types";
import styled from "styled-components";
import {useRovingFocus} from "../hooks/useRovingFocus";

const MenuKeyboardNavComponent = forwardRef<HTMLElement, React.ComponentProps<KeyboardNavProps>>(({children, component, ...props}, ref) => {
    const count = React.Children.count(children)
    const { $focusStyles, onNavigate, onActivate, defaultActiveIndex = 0 } = props
    const StyledBase = styled(component as React.ComponentType)`${$focusStyles}`

    const { getItemProps, containerProps } = useRovingFocus({
        count,
        orientation: 'orientation' in props ? props.orientation : 'vertical',
        loop: 'loop' in props ? props.loop : true,
        onNavigate,
        onActivate,
        defaultActiveIndex,
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

export default MenuKeyboardNavComponent