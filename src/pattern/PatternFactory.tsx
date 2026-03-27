import React from "react"
import Accordion from "./Accordion"
import {forwardRef} from "react"
import {css} from "styled-components"
import {KeyboardNavProps} from "../types"
import MenuKeyboardNavComponent from "./Menu";

export const PATTERN_STRATEGIES = {
    accordion: Accordion,
    menu: MenuKeyboardNavComponent,
}

export default function PatternFactory<T>(component: T, keyProps: KeyboardNavProps) {
    const focusStyles = keyProps.focusStyle
        ? css`
        &:focus,
        &:focus-visible {
          ${keyProps.focusStyle}
        }
      `
        : css`
        &:focus-visible {
          outline: 3px solid currentColor;
          outline-offset: 2px;
        }
      `

    const Component = PATTERN_STRATEGIES[keyProps.pattern]

    return forwardRef(({...props}, ref) => {
        return <Component $focusStyles={focusStyles} ref={ref} {...props} {...keyProps} component={component} />
    })
}