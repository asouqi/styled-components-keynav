import React, { forwardRef } from "react"
import styled, {Interpolation} from "styled-components"
import { useGridNavigation } from "../hooks/useGridNavigation"
import { GridPattern, GridNavProps } from "../types"

type GridComponentProps = GridPattern & GridNavProps & {
    children?: React.ReactNode
    component: React.ComponentType<any>
    $focusStyles: Interpolation<{}>[]
}
const GridKeyboardNavComponent = forwardRef<HTMLElement, GridComponentProps>(
    ({ children, component, $focusStyles, onNavigate, onActivate, rows, columns, loop = false, defaultRowIndex = 0, defaultColumnIndex = 0, ...props }, ref) => {
        const StyledBase = styled(component)`${$focusStyles}`

        const gridNav = useGridNavigation({
            rows,
            columns,
            loop,
            onNavigate,
            onActivate,
            defaultRowIndex,
            defaultColumnIndex,
        })

        // Expects children to be a flat array or rows containing cells
        // User is responsible for structure, we provide getCellProps
        const childrenWithKeyboardNav = React.Children.toArray(children).map(children, (row, rowIndex) => {
            if (!React.isValidElement(row)) return row

            const cells = React.Children.toArray(row.props.children).map(children, (cell, colIndex) => {
                if (!React.isValidElement(cell)) return cell
                return React.cloneElement(cell, {
                    ...gridNav.getCellProps(rowIndex, colIndex),
                })
            })

            return React.cloneElement(row, {children: cells})
        })

        return (
            <StyledBase ref={ref} {...gridNav.containerProps} {...props}>
                {childrenWithKeyboardNav}
            </StyledBase>
        )
    }
)

export default GridKeyboardNavComponent