import React, { forwardRef } from "react"
import styled from "styled-components"
import { useTabs } from "../hooks/useTabs"
import { TabsPattern, LinearNavProps } from "../types"

type TabsComponentProps = TabsPattern & LinearNavProps & {
    children?: React.ReactNode
    component: React.ComponentType<any>
    $focusStyles: any
}

const TabsKeyboardNavComponent = forwardRef<HTMLElement, TabsComponentProps>(
    ({ children, component, $focusStyles, onNavigate, onActivate, defaultActiveIndex = 0, orientation = 'horizontal', loop = true, activationMode = 'manual', ...props }, ref) => {
        const count = React.Children.count(children)
        const StyledBase = styled(component)`${$focusStyles}`

        const { getItemProps, containerProps } = useTabs({
            count,
            orientation,
            loop,
            activationMode,
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
            <StyledBase ref={ref} {...containerProps} {...props}>
                {childrenWithKeyboardNav}
            </StyledBase>
        )
    }
)

export default TabsKeyboardNavComponent