import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

function AppButton({

    children,
    variant = "contained",
    color = "primary",
    size = "medium",
    fullWidth = false,
    loading = false,
    startIcon,
    endIcon,
    onClick,
    type = "button",
    disabled = false,
    sx = {},
    ...props

}) {

    return (

        <Button

            variant={variant}
            color={color}
            size={size}
            fullWidth={fullWidth}
            startIcon={!loading ? startIcon : undefined}
            endIcon={!loading ? endIcon : undefined}
            onClick={onClick}
            type={type}
            disabled={disabled || loading}
            sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 1,
                boxShadow: 3,
                ...sx
            }}
            {...props}

        >

            {

                loading

                    ?

                    <CircularProgress
                        size={20}
                        color="inherit"
                    />

                    :

                    children

            }

        </Button>

    );

}

export default AppButton;