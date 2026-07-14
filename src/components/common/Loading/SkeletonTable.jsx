import {

    Skeleton,
    Stack

} from "@mui/material";

function SkeletonTable({

    rows=8

}){

    return(

        <Stack spacing={1}>

            {

                Array.from({

                    length:rows

                }).map((_,index)=>(

                    <Skeleton

                        key={index}

                        variant="rounded"

                        height={52}

                    />

                ))

            }

        </Stack>

    );

}

export default SkeletonTable;