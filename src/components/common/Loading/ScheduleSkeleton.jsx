import Grid from "@mui/material/Grid";
import {
    Skeleton,
    Stack
} from "@mui/material";

import SkeletonCard from "./SkeletonCard";
import SkeletonList from "./SkeletonList";

function ScheduleSkeleton() {

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

            <Grid size={{ xs: 12, lg: 12 }}>

                <SkeletonCard />

            </Grid>

            {/* <Grid size={{ xs: 12, lg: 4 }}>

                <SkeletonList rows={6} />

            </Grid> */}

        </Grid>

    );

}

export default ScheduleSkeleton;