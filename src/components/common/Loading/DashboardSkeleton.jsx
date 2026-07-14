import Grid from "@mui/material/Grid";

import SkeletonCard from "./SkeletonCard";
import SkeletonList from "./SkeletonList";

function DashboardSkeleton() {

    return (

        <>
            <Grid
                container
                spacing={{
                    xs: 2,
                    md: 3
                }}
            >

                <Grid size={{ xs: 12, md: 4 }}>

                    <SkeletonCard />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <SkeletonCard />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <SkeletonCard />

                </Grid>

            </Grid>

            <Grid
                container
                spacing={3}
                sx={{
                    mt: {
                        xs: 4,
                        md: 3
                    }
                }}
            >

                <Grid
                    size={{
                        xs: 12,
                        xl: 6
                    }}
                >

                    <SkeletonCard />

                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        xl: 6
                    }}
                >

                    <SkeletonList rows={5} />

                </Grid>

            </Grid>

        </>

    );

}

export default DashboardSkeleton;