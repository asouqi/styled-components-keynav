import { useRovingFocus } from './useRovingFocus'
import {UseRovingFocus, UseRovingFocusProps} from "../types";

type UseTabsProps = Omit<UseRovingFocusProps, 'orientation'> & {
    orientation?: 'horizontal' | 'vertical'
    /** 'automatic' = select on focus, 'manual' = select on Enter/Space */
    activationMode?: 'automatic' | 'manual'
}

type UseTabs = UseRovingFocus & {
    getTabProps: (index: number) => ReturnType<UseRovingFocus['getItemProps']> & {
        role: 'tab'
    }
}

export function useTabs({
                            count,
                            orientation = 'horizontal',
                            activationMode = 'manual',
                            loop = true,
                            onNavigate,
                            onActivate,
                            defaultActiveIndex = 0,
                        }: UseTabsProps): UseTabs {
    // If automatic, selecting happens on navigation
    const handleNavigate = (index: number) => {
        onNavigate?.(index)
        if (activationMode === 'automatic') {
            onActivate?.(index)
        }
    }

    const rovingFocus = useRovingFocus({
        count,
        orientation,
        loop,
        onNavigate: handleNavigate,
        onActivate,  // Only fires on Enter/Space in manual mode
        defaultActiveIndex,
    })

    return {
        ...rovingFocus,
        getTabProps: (index: number) => ({
            ...rovingFocus.getItemProps(index),
            role: 'tab' as const,
        }),
    }
}

export type { UseTabsProps }