import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from "@mui/material";

import AppButton from "../../../components/common/Button/AppButton";

function TrainingDialog({

    open,
    editingId,
    form,
    rooms,
    trainerError,
    onChange,
    onSearchTrainer,
    onTrainerKeyDown,
    onClose,
    onSubmit
}) {

    const closeFormDialog = () => {

        setTrainerError("");

        setDialogOpen(false);

        setEditingId(null);

        setForm(initialForm);

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            component="form"
            onSubmit={onSubmit}
        >

            <DialogTitle>

                {editingId ? "Edit Training" : "Tambah Training"}

            </DialogTitle>

            <DialogContent
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr"
                    },
                    gap: 2,
                    pt: "12px !important"
                }}
            >

                <TextField
                    name="title"
                    label="Nama Training"
                    value={form.title}
                    onChange={onChange}
                    required
                    sx={{
                        gridColumn: "1 / -1"
                    }}
                />

                <TextField
                    name="date"
                    label="Tanggal"
                    type="date"
                    value={form.date}
                    onChange={onChange}
                    required
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                />

                <TextField
                    name="time"
                    label="Waktu"
                    type="time"
                    value={form.time}
                    onChange={onChange}
                    required
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                />

                <TextField
                    name="trainerId"
                    label="NIK Trainer"
                    value={form.trainerId}
                    onChange={onChange}
                    onBlur={onSearchTrainer}
                    onKeyDown={onTrainerKeyDown}
                    error={Boolean(trainerError)}
                    helperText={trainerError}
                    required
                />

                <TextField
                    name="trainerName"
                    label="Nama Trainer"
                    value={form.trainerName}
                    slotProps={{
                        input: {
                            readOnly: true
                        }
                    }}
                    sx={{
                        "& .MuiInputBase-input.Mui-readOnly": {
                            bgcolor: "#F8F9FA"
                        }
                    }}
                />

                <TextField
                    name="room"
                    label="Ruangan"
                    select
                    value={form.room}
                    onChange={onChange}
                    required
                >

                    {rooms.map((room) => (

                        <MenuItem
                            key={room.ROOM_ID}
                            value={room.ROOM_ID}
                        >

                            {room.ROOM_NM}

                        </MenuItem>

                    ))}

                </TextField>

            </DialogContent>

            <DialogActions
                sx={{
                    px: 3,
                    pb: 3
                }}
            >

                <AppButton
                    variant="outlined"
                    onClick={onClose}
                    sx={{
                        boxShadow: "none"
                    }}
                >

                    Batal

                </AppButton>

                <AppButton
                    type="submit"
                >

                    {editingId
                        ? "Simpan Perubahan"
                        : "Simpan Training"}

                </AppButton>

            </DialogActions>

        </Dialog>

    );

}

export default TrainingDialog;