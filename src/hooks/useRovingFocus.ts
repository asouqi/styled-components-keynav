import React, {useState, useCallback, useRef} from "react"
import type { UseRovingFocus, Orientation } from '../types';
import {KeyboardNavProps} from "../types";

type RovingFocusProps = Pick<KeyboardNavProps, 'onNavigate' | 'onActivate' | 'defaultActiveIndex'> & {
    count: number
    orientation?: Orientation;
    loop?: boolean;
};

/**
 * Manages roving tabIndex across a set of items, and move focus between items using Arrow keys.
 */
export function useRovingFocus({count, orientation, loop, onNavigate, onActivate, defaultActiveIndex = 0}: RovingFocusProps): UseRovingFocus {
    const [activeIndex, _setActiveIndex] = useState(defaultActiveIndex)
    const activeElementRef = useRef<HTMLElement>(null)

    const setActiveIndex = useCallback((index: number) => {
        _setActiveIndex(index)
        onNavigate?.(index)
    }, [onNavigate])

    const getItemProps = useCallback((index: number) => ({
        tabIndex: index === activeIndex ? 0 : -1,
        'data-active': index === activeIndex,
        onFocus: () => setActiveIndex(index),
        ref: (e: HTMLElement) => {
            if (e?.tabIndex === 0) {
                e.focus()
                activeElementRef.current = e
            }
        },
    }), [activeIndex, setActiveIndex])

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
        const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'
        switch (e.key) {
            case prevKey: {
                e.preventDefault()
                const previous = activeIndex - 1
                setActiveIndex(loop ? (previous < 0 ? count - 1 : previous) : Math.max(previous, 0))
                break
            }
            case nextKey: {
                e.preventDefault()
                const next = activeIndex + 1
                setActiveIndex(loop ? next % count : Math.min(next, count + 1))
                break
            }
            case 'Home': {
                e.preventDefault()
                setActiveIndex(0)
                break
            }
            case 'End': {
                e.preventDefault()
                setActiveIndex(count - 1)
                break
            }
            case 'Enter':
            case ' ': {
                e.preventDefault()
                onActivate?.(activeIndex)
                break
            }
        }
    }, [count, loop, orientation, activeIndex, setActiveIndex, onActivate])

    return {
        activeIndex,
        setActiveIndex,
        getItemProps,
        containerProps: {
            onKeyDown: handleKeyDown
        }
    }
}
