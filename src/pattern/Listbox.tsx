import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { useRovingFocus } from '../hooks/useRovingFocus'
import { KeyboardNavProps } from '../types'

const ListboxKeyboardNavComponent = forwardRef<HTMLElement, React.ComponentProps<KeyboardNavProps>>(
    ({ children, component, ...props }, ref) => {
        const count = React.Children.count(children)
        const { $focusStyles, onNavigate, onActivate, defaultActiveIndex = 0 } = props
        const StyledBase = styled(component as React.ComponentType)`${$focusStyles}`

        const { getItemProps, containerProps } = useRovingFocus({
            count,
            orientation: 'vertical',
            loop: props.loop ?? false,
            onNavigate,
            onActivate,
            defaultActiveIndex,
        })

        const childrenWithKeyboardNav = React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) return child
            return React.cloneElement(child as React.ReactElement, {
                ...getItemProps(index),
            })
        })

        return (
            <StyledBase
                ref={ref}
                {...containerProps}
                children={childrenWithKeyboardNav}
                {...props}
            />
        )
    }
)

export default ListboxKeyboardNavComponent