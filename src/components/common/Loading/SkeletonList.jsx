import {
    Card,
    CardContent,
    Skeleton,
    Stack
} from "@mui/material";

function SkeletonList({

    rows = 5

}) {

    return (

        <Card
            sx={{
                borderRadius: 3
            }}
        >

            <CardContent>

                <Skeleton
                    width="35%"
                    height={30}
                    sx={{
                        mb:2
                    }}
                />

                <Stack spacing={2}>

                    {

                        Array.from({

                            length: rows

                        }).map((_,index)=>(

                            <Skeleton

                                key={index}

                                variant="rounded"

                                height={60}

                            />

                        ))

                    }

                </Stack>

            </CardContent>

        </Card>

    );

}

export default SkeletonList;