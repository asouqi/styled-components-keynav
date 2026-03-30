import React, { useState, useCallback, useRef } from 'react'
import {UseGridNavigation} from "../types";

type UseGridNavigationProps = {
    /** Number of rows */
    rows: number
    /** Number of columns */
    columns: number
    /** Wrap around edges */
    loop?: boolean
    /** Called when focused cell changes */
    onNavigate?: (row: number, column: number) => void
    /** Called when Enter/Space pressed */
    onActivate?: (row: number, column: number) => void
    /** Initial focused row */
    defaultRowIndex?: number
    /** Initial focused column */
    defaultColumnIndex?: number
}


export function useGridNavigation({
                                      rows,
                                      columns,
                                      loop = false,
                                      onNavigate,
                                      onActivate,
                                      defaultRowIndex = 0,
                                      defaultColumnIndex = 0,
                                  }: UseGridNavigationProps): UseGridNavigation {
    const [activeRow, setActiveRow] = useState(defaultRowIndex)
    const [activeColumn, setActiveColumn] = useState(defaultColumnIndex)
    const activeElementRef = useRef<HTMLElement>(null)

    const setActiveCell = useCallback((row: number, column: number) => {
        setActiveRow(row)
        setActiveColumn(column)
        onNavigate?.(row, column)
    }, [onNavigate])

    const getCellProps = useCallback((row: number, column: number) => {
        const isActive = row === activeRow && column === activeColumn
        return {
            tabIndex: isActive ? 0 : -1,
            'data-active': isActive,
            onFocus: () => setActiveCell(row, column),
            ref: (e: HTMLElement) => {
                if (e?.tabIndex === 0) {
                    e.focus()
                    activeElementRef.current = e
                }
            },
        }
    }, [activeRow, activeColumn, setActiveCell])

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        let nextRow = activeRow
        let nextColumn = activeColumn

        switch (e.key) {
            case 'ArrowUp': {
                e.preventDefault()
                const prev = activeRow - 1
                if (loop) {
                    nextRow = prev < 0 ? rows - 1 : prev
                } else {
                    nextRow = Math.max(prev, 0)
                }
                break
            }

            case 'ArrowDown': {
                e.preventDefault()
                const next = activeRow + 1
                if (loop) {
                    nextRow = next >= rows ? 0 : next
                } else {
                    nextRow = Math.min(next, rows - 1)
                }
                break
            }

            case 'ArrowLeft': {
                e.preventDefault()
                const prev = activeColumn - 1
                if (loop) {
                    nextColumn = prev < 0 ? columns - 1 : prev
                } else {
                    nextColumn = Math.max(prev, 0)
                }
                break
            }

            case 'ArrowRight': {
                e.preventDefault()
                const next = activeColumn + 1
                if (loop) {
                    nextColumn = next >= columns ? 0 : next
                } else {
                    nextColumn = Math.min(next, columns - 1)
                }
                break
            }

            case 'Home': {
                e.preventDefault()
                if (e.ctrlKey) {
                    // Ctrl+Home: first cell
                    nextRow = 0
                    nextColumn = 0
                } else {
                    // Home: first cell in row
                    nextColumn = 0
                }
                break
            }

            case 'End': {
                e.preventDefault()
                if (e.ctrlKey) {
                    // Ctrl+End: last cell
                    nextRow = rows - 1
                    nextColumn = columns - 1
                } else {
                    // End: last cell in row
                    nextColumn = columns - 1
                }
                break
            }

            case 'PageUp': {
                e.preventDefault()
                nextRow = 0
                break
            }

            case 'PageDown': {
                e.preventDefault()
                nextRow = rows - 1
                break
            }

            case 'Enter':
            case ' ': {
                e.preventDefault()
                onActivate?.(activeRow, activeColumn)
                return
            }

            default:
                return
        }

        setActiveCell(nextRow, nextColumn)
    }, [rows, columns, loop, activeRow, activeColumn, setActiveCell, onActivate])

    return {
        activeRow,
        activeColumn,
        setActiveCell,
        getCellProps,
        containerProps: {
            role: 'grid',
            onKeyDown: handleKeyDown,
        },
    }
}