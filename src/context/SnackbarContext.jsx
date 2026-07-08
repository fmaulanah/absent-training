import { createContext, useCallback, useMemo, useState } from "react";

import AppSnackbar from "../components/common/Snackbar/AppSnackbar";

export const SnackbarContext = createContext(null);

function SnackbarProvider({ children }) {

    const [snackbar, setSnackbar] = useState({

        open: false,
        message: "",
        severity: "success"

    });

    const showSnackbar = useCallback((message, severity = "success") => {

        setSnackbar({

            open: true,
            message,
            severity

        });

    }, []);

    const closeSnackbar = () => {

        setSnackbar(current => ({

            ...current,

            open: false

        }));

    };

    const value = useMemo(() => ({

        showSnackbar

    }), [showSnackbar]);

    return (

        <SnackbarContext.Provider value={value}>

            {children}

            <AppSnackbar

                open={snackbar.open}

                message={snackbar.message}

                severity={snackbar.severity}

                onClose={closeSnackbar}

            />

        </SnackbarContext.Provider>

    );

}

export default SnackbarProvider;