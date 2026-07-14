import {
    Card,
    CardContent,
    Skeleton,
    Stack
} from "@mui/material";

function SkeletonCard() {

    return (

        <Card
            sx={{
                borderRadius: 3
            }}
        >

            <CardContent>

                <Stack spacing={2}>

                    <Skeleton
                        variant="text"
                        width="40%"
                        height={32}
                    />

                    <Skeleton
                        variant="rounded"
                        height={60}
                    />

                </Stack>

            </CardContent>

        </Card>

    );

}

export default SkeletonCard;