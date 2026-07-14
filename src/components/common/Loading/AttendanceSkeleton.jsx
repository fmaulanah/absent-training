import Grid from "@mui/material/Grid";
import {
    Box,
    Skeleton
} from "@mui/material";

import SkeletonCard from "./SkeletonCard";

function AttendanceSkeleton() {

    return (

        <Grid
            container
            spacing={3}
        >

            <Grid size={{ xs: 12 }}>

                <Skeleton
                    variant="rounded"
                    height={56}
                />

            </Grid>

            <Grid size={{ xs: 12 }}>

                <SkeletonCard />

            </Grid>

            <Grid size={{ xs: 12 }}>

                <SkeletonCard />

            </Grid>

            <Grid size={{ xs: 12 }}>

                <Box>

                    {

                        Array.from({

                            length: 6

                        }).map((_, index) => (

                            <Skeleton

                                key={index}

                                variant="rounded"

                                height={54}

                                sx={{
                                    mb: 1
                                }}

                            />

                        ))

                    }

                </Box>

            </Grid>

        </Grid>

    );

}

export default AttendanceSkeleton;