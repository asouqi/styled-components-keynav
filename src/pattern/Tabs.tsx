import React, {forwardRef} from "react"
import { KeyboardNavProps } from "../types";
import styled from "styled-components";
import {useTabs} from "../hooks/useTabs";

const TabsKeyboardNavComponent = forwardRef<HTMLElement, React.ComponentProps<KeyboardNavProps>>(({children, component, ...props}, ref) => {
    const count = React.Children.count(children)
    const { $focusStyles, onNavigate, onActivate, defaultActiveIndex = 0 } = props
    const StyledBase = styled(component as React.ComponentType)`${$focusStyles}`

    const { getItemProps, containerProps } = useTabs({
        count,
        orientation: props.orientation,
        loop: props.loop,
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

export default TabsKeyboardNavComponent