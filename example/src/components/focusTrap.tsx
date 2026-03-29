import React, {useState} from "react";
import {useFocusTrap} from "../../../src/hooks/useFocusTrap";

export function SimpleModal() {
    const [open, setOpen] = useState(false);
    const { containerRef, activate, deactivate } = useFocusTrap()

    const handleOpen = () => {
        setOpen(true);
        setTimeout(activate, 0); // activate after render
    };

    const handleClose = () => {
        deactivate(); // restores focus
        setOpen(false);
    };

    return (
        <>
            <button onClick={handleOpen}>Open</button>

            {open && (
                <div ref={containerRef}>
                    <input placeholder="First name" />
                    <input placeholder="Last name" />
                    <button onClick={handleClose}>Close</button>
                </div>
            )}
        </>
    );
}
