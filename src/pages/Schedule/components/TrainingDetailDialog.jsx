import dayjs from "dayjs";

import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";

import AppButton from "../../../components/common/Button/AppButton";

function TrainingDetailDialog({
    training,
    rooms,
    open,
    onClose,
    onEdit
}) {

    const roomName = training ? rooms.find(room => room.ROOM_ID === training.room)?.ROOM_NM ?? training.room : "";

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                Detail Training

            </DialogTitle>

            {training && (

                <DialogContent>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        gutterBottom
                    >
                        {training.title}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={3}
                    >
                        Informasi Training
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "140px 1fr",
                            rowGap: 2.5,
                            columnGap: 3
                        }}
                    >

                        <Typography fontWeight={600} color="text.secondary">
                            Tanggal
                        </Typography>

                        <Typography>
                            {dayjs(training.date).format("DD MMMM YYYY")}
                        </Typography>

                        <Typography fontWeight={600} color="text.secondary">
                            Waktu
                        </Typography>

                        <Typography>
                            {training.time}
                        </Typography>

                        <Typography fontWeight={600} color="text.secondary">
                            Ruangan
                        </Typography>

                        <Typography>
                            {roomName}
                        </Typography>

                        <Typography fontWeight={600} color="text.secondary">
                            Trainer ID
                        </Typography>

                        <Typography>
                            {training.trainerId || "-"}
                        </Typography>

                        <Typography fontWeight={600} color="text.secondary">
                            Trainer
                        </Typography>

                        <Typography>
                            {training.trainerName || "-"}
                        </Typography>

                    </Box>

                </DialogContent>

            )}

            <DialogActions
                sx={{
                    px: 3,
                    pb: 3
                }}
            >

                <AppButton
                    variant="outlined"
                    sx={{
                        boxShadow: "none"
                    }}
                    onClick={onClose}
                >

                    Tutup

                </AppButton>

                <AppButton
                    onClick={onEdit}
                >

                    Edit Training

                </AppButton>

            </DialogActions>

        </Dialog>

    );

}
    
export default TrainingDetailDialog;