import React, {forwardRef} from "react"
import {useAccordion} from "../hooks/useAccordion"
import { KeyboardNavProps } from "../types";
import styled from "styled-components";

const AccordionKeyboardNavComponent = forwardRef<HTMLElement, React.ComponentProps<KeyboardNavProps>>(({children, component, ...props}, ref) => {
    const count = React.Children.count(children)
    const { multiExpand, $focusStyles } = props
    const StyledBase = styled(component as React.ComponentType)`${$focusStyles}`

    const { getItemProps, containerProps } = useAccordion({count, multiExpand})
    const childrenWithKeyboardNav = React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child as React.ReactNode)) return child
        return React.cloneElement(
            child as React.ReactNode,
            {...getItemProps(index)}
        )
    })

    return <StyledBase ref={ref} {...containerProps} children={childrenWithKeyboardNav} {...props} />
})

export default AccordionKeyboardNavComponent


// const KeyboardNavComponent = forwardRef<HTMLElement, EnhancedProps>(({children, ...props}, ref) => {
//     // TODO:: we need to improve that to handle cases with complex structure, add multiple strategy detection
//     const count = React.Children.count(children)
//     const { getItemProps, containerProps } = useRovingFocus({
//         count,
//         orientation: 'orientation' in keyProps ? keyProps.orientation : 'vertical',
//         loop: 'loop' in keyProps ? keyProps.loop : true,
//         onNavigate,
//         onActivate,
//         defaultActiveIndex,
//     })
//     const childrenWithKeyboardNav = React.Children.map(children, (child, index) => {
//         if (!React.isValidElement(child as React.ReactNode)) return child
//         return React.cloneElement(
//             child as React.ReactNode,
//             {...getItemProps(index)}
//         )
//     })
//     return <StyledBase ref={ref} {...containerProps} children={childrenWithKeyboardNav} {...props} />
// })