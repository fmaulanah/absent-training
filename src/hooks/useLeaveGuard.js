import { useState } from "react";

function useLeaveGuard() {

    const [open, setOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);

    const requestLeave = (action) => {

        setPendingAction(() => action);
        setOpen(true);

    };

    const confirmLeave = () => {

        setOpen(false);
        pendingAction?.();
        setPendingAction(null);

    };

    const cancelLeave = () => {

        setOpen(false);
        setPendingAction(null);

    };

    return {

        open,
        requestLeave,
        confirmLeave,
        cancelLeave

    };

}

export default useLeaveGuard;