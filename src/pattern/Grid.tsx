import React, {forwardRef, ReactNode} from "react"
import styled, {Interpolation} from "styled-components"
import { useGridNavigation } from "../hooks/useGridNavigation"
import { GridPattern, GridNavProps } from "../types"

type GridComponentProps = GridPattern & GridNavProps & {
    children?: React.ReactNode
    component: React.ComponentType<any>
    $focusStyles: Interpolation<{}>[]
}
const GridKeyboardNavComponent = forwardRef<HTMLElement, GridComponentProps>(
    ({ children, component, $focusStyles, onNavigate, onActivate, rows, columns, loop = false, ...props }, ref) => {
        const StyledBase = styled(component)`${$focusStyles}` as any

        const gridNav = useGridNavigation({
            rows,
            columns,
            loop,
            onNavigate,
            onActivate,
        })

        // Expects children to be a flat array or rows containing cells
        // User is responsible for structure, we provide getCellProps
        const childrenWithKeyboardNav = React.Children.toArray(children).map((row, rowIndex) => {
            if (!React.isValidElement(row)) return row

            const cells = React.Children.toArray((row.props as React.ComponentProps<'html'>).children).map((cell, colIndex) => {
                if (!React.isValidElement(cell)) return cell
                return React.cloneElement(cell, {
                    ...gridNav.getCellProps(rowIndex, colIndex),
                })
            })

            return React.cloneElement(row, row.props as any, cells)
        })

        return (
            <StyledBase ref={ref} {...gridNav.containerProps} {...props}>
                {childrenWithKeyboardNav}
            </StyledBase>
        )
    }
)

export default GridKeyboardNavComponent