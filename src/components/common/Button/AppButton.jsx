import Button from "@mui/material/Button";

function AppButton({

    children,

    variant = "contained",

    color = "primary",

    size = "medium",

    fullWidth = false,

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

            startIcon={startIcon}

            endIcon={endIcon}

            onClick={onClick}

            type={type}

            disabled={disabled}

            sx={{

                borderRadius:2,

                textTransform:"none",

                fontWeight:600,

                px:3,

                py:1,

                boxShadow:2,

                ...sx

            }}

            {...props}

        >

            {children}

        </Button>

    );

}

export default AppButton;