import {UseFocusTrap} from "../types";
import {useCallback, useRef, useState} from "react";

const FOCUSABLE_SELECTORS = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * Traps focus within a container element.
 * Useful for modals, dropdowns, and dialogs.
 * Restores focus to the previously focused element on deactivation.
 */
export function useFocusTrap(): UseFocusTrap {
    const containerRef = useRef<HTMLElement | null>(null)
    const previousFocusRef = useRef<HTMLElement | null>(null)
    const [isActive, setIsActive] = useState(false)

    const getFocusableElement = useCallback(() => {
        if (!containerRef.current) return [] as HTMLElement[]
        return Array.from(containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS))
    }, [])

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
       if (e.key === 'Tab') {
           const focusable = getFocusableElement()
           if (focusable.length === 0) return

           const first = focusable[0]
           const last = focusable[focusable.length - 1]
           if (e.shiftKey) {
               // Shit+Tab going backward
               if (document.activeElement === first) {
                   e.preventDefault()
                   last.focus()
               }
           } else {
               // Tab going forward
               if (document.activeElement === last) {
                   e.preventDefault()
                   first.focus()
               }
           }
       }
    }, [getFocusableElement])

    const activate = useCallback(() => {
        previousFocusRef.current = document.activeElement as HTMLElement
        const focusable = getFocusableElement()

        if (focusable.length > 0) {
            focusable[0].focus()
        }

        document.addEventListener('keydown', handleKeyDown)
        setIsActive(true)
    }, [getFocusableElement, handleKeyDown])

    const deactivate = useCallback(() => {
        document.removeEventListener('keydown', handleKeyDown)
        // restore focus to the previous focusable element
        if (previousFocusRef.current) {
            previousFocusRef.current!.focus()
            previousFocusRef.current = null
        }
        setIsActive(false)
    }, [handleKeyDown])

    return {
        containerRef,
        activate,
        deactivate,
        isActive
    }
}