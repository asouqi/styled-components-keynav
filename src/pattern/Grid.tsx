import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { useGridNavigation } from '../hooks/useGridNavigation'
import { KeyboardNavProps } from '../types'

const GridKeyboardNavComponent = forwardRef<HTMLElement, React.ComponentProps<KeyboardNavProps>>(
    ({ children, component, ...props }, ref) => {
        const { $focusStyles, onNavigate, onActivate, rows, columns } = props
        const StyledBase = styled(component as React.ComponentType)`${$focusStyles}`

        const gridNav = useGridNavigation({
            rows,
            columns,
            loop: props.loop ?? false,
            onNavigate,
            onActivate,
            defaultRowIndex: props.defaultRowIndex ?? 0,
            defaultColumnIndex: props.defaultColumnIndex ?? 0,
        })

        // Expects children to be a flat array or rows containing cells
        // User is responsible for structure, we provide getCellProps
        const childrenWithKeyboardNav = React.Children.map(children, (row, rowIndex) => {
            if (!React.isValidElement(row)) return row

            const cells = React.Children.map(row.props.children, (cell, colIndex) => {
                if (!React.isValidElement(cell)) return cell
                return React.cloneElement(cell as React.ReactElement, {
                    ...gridNav.getCellProps(rowIndex, colIndex),
                })
            })

            return React.cloneElement(row as React.ReactElement, {
                children: cells,
            })
        })

        return (
            <StyledBase
                ref={ref}
                {...gridNav.containerProps}
                children={childrenWithKeyboardNav}
                {...props}
            />
        )
    }
)

export default GridKeyboardNavComponent