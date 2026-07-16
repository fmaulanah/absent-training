import dayjs from "dayjs";

import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Divider, Chip} from "@mui/material";

import AppButton from "../../../components/common/Button/AppButton";

function ScheduleTrainingDetailDialog({ training, rooms, open, onClose, onEdit }) 
{
    const roomName = training ? rooms.find(room => room.ROOM_ID === training.room)?.ROOM_NM ?? training.room : "";

    const DetailItem = ({ label, value }) => (

        <Box
            sx={{
                mb: 2.5
            }}
        >

            <Typography
                variant="h6"
                fontWeight={200}
                sx={{
                    mb: .5
                }}
            >

                {label}

            </Typography>

            <Typography
                variant="body1"
            >

                {value || "-"}

            </Typography>

        </Box>

    );

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
        >
            {training && (

                <DialogContent>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        {training.title}
                    </Typography>

                    <Divider
                        sx={{
                            my: 2
                        }}
                    />

                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                            mb: 3,
                            fontWeight: 600,
                            letterSpacing: 0.5,
                            textTransform: "uppercase"
                        }}
                    >
                        Informasi Training
                    </Typography>

                    <DetailItem
                        label="Tanggal"
                        value={
                            training.startDate === training.endDate
                                ? dayjs(training.startDate).format("DD MMMM YYYY")
                                : `${dayjs(training.startDate).format("DD MMMM YYYY")} - ${dayjs(training.endDate).format("DD MMMM YYYY")}`
                        }
                    />

                    <DetailItem
                        label="Ruangan"
                        value={roomName}
                    />

                    <DetailItem
                        label="NIK"
                        value={training.trainerId}
                    />

                    <DetailItem
                        label="Nama PIC"
                        value={training.trainerName}
                    />

                    <DetailItem
                        label="Keterangan"
                        value={training.memo}
                    />

                    <Typography
                        variant="h6"
                        fontWeight={200}
                    >
                        Status
                    </Typography>

                    <Chip
                        label={training.useYn === "Y" ? "Aktif" : "Non Aktif"}
                        color={training.useYn === "Y" ? "success" : "default"}
                        size="small"
                    />

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
    
export default ScheduleTrainingDetailDialog;