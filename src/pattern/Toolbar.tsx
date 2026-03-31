import React, { ReactElement, forwardRef } from "react"
import styled from "styled-components"
import { useRovingFocus } from "../hooks/useRovingFocus"
import { ToolbarPattern, LinearNavProps } from "../types"

type ToolbarComponentProps = ToolbarPattern & LinearNavProps & {
    children?: React.ReactNode
    component: React.ComponentType<ReactElement>
    $focusStyles: any
}

const ToolbarKeyboardNavComponent = forwardRef<HTMLElement, ToolbarComponentProps>(
    ({ children, component, $focusStyles, onNavigate, onActivate, defaultActiveIndex = 0, orientation = 'vertical', loop = true, ...props }, ref) => {
        const count = React.Children.count(children)
        const StyledBase = styled(component)`${$focusStyles}` as any

        const { getItemProps, containerProps } = useRovingFocus({
            count,
            orientation,
            loop,
            onNavigate,
            onActivate,
            defaultActiveIndex,
        })

        const childrenWithKeyboardNav = React.Children.toArray(children).map((child, index) => {
            if (!React.isValidElement(child)) return child
            return React.cloneElement(child, {
                ...getItemProps(index),
            })
        })

        return (
            <StyledBase role={'toolbar'} ref={ref} {...containerProps} {...props}>
                {childrenWithKeyboardNav}
            </StyledBase>
        )
    }
)

export default ToolbarKeyboardNavComponent