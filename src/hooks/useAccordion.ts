import {useRovingFocus} from "./useRovingFocus";
import {useState} from "react";

/** manage state of expanded items */
export function useAccordion({count, multiExpand}) {
    const navigation = useRovingFocus({count, orientation: 'vertical'})
    const [expanded, setExpanded] = useState<Set<number> | number>(multiExpand ? new Set<number>() : null)

    const toggle = (index: number) => {
        if (multiExpand && typeof expanded === 'number') {
            setExpanded(currentIndex => index === currentIndex ? null : index)
        } else {
            setExpanded(currentSet => {
                const next = new Set(currentSet as Set<number>)
                next.has(index) ? next.delete(index) : next.add(index)
                return next
            })
        }
    }

    const isExpanded = (index: number) => typeof expanded  === 'number' ? expanded === index : expanded.has(index)

    return {...navigation, toggle, isExpanded}
}