import React, { forwardRef } from "react"
import styled from "styled-components"
import { useRovingFocus } from "../hooks/useRovingFocus"
import { ListboxPattern, LinearNavProps } from "../types"

type ListboxComponentProps = ListboxPattern & LinearNavProps & {
    children?: React.ReactNode
    component: React.ComponentType<any>
    $focusStyles: any
}

const ListboxKeyboardNavComponent = forwardRef<HTMLElement, ListboxComponentProps>(
    ({ children, component, $focusStyles, onNavigate, onActivate, defaultActiveIndex = 0, orientation = 'vertical', loop = false, ...props }, ref) => {
        const count = React.Children.count(children)
        const StyledBase = styled(component)`${$focusStyles}`

        const { getItemProps, containerProps } = useRovingFocus({
            count,
            orientation,
            loop,
            onNavigate,
            onActivate,
            defaultActiveIndex,
        })

        const childrenWithKeyboardNav = React.Children.toArray(children).map(children, (child, index) => {
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

export default ListboxKeyboardNavComponent