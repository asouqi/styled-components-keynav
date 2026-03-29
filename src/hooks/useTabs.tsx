import { useRovingFocus } from './useRovingFocus'

type UseTabsProps = {
    count: number
    orientation?: 'horizontal' | 'vertical'
    activationMode?: 'manual' | 'automatic'
    loop?: boolean
    onNavigate?: (index: number) => void
    onActivate?: (index: number) => void
    defaultActiveIndex?: number
}

export function useTabs({
                            count,
                            orientation = 'horizontal',
                            activationMode = 'manual',
                            loop = true,
                            onNavigate,
                            onActivate,
                            defaultActiveIndex = 0,
                        }: UseTabsProps) {

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
            role: 'tab',
        }),
    }
}