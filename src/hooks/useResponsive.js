import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function useResponsive() {

    const theme = useTheme();

    return {

        isMobile: useMediaQuery(theme.breakpoints.down("md")),
        isTablet: useMediaQuery(theme.breakpoints.down("lg"))

    };

}