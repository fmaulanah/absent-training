import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, FormControlLabel, Checkbox } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import AppButton from "../../../components/common/Button/AppButton";
import LoadingOverlay from "../../../components/common/Loading/LoadingOverlay";

function TrainingDialog({ open, editingId, form, rooms, trainerError, saving,
                          onChange, onSearchTrainer, onTrainerKeyDown, onClose, onSubmit }) 
{
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
                    disabled={saving}
                    required
                    sx={{
                        gridColumn: "1 / -1"
                    }}
                />

                <TextField
                    name="startDate"
                    label="Tanggal Mulai"
                    type="date"
                    value={form.startDate}
                    onChange={onChange}
                    disabled={saving}
                    required
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                />

                <TextField
                    name="endDate"
                    label="Tanggal Selesai"
                    type="date"
                    value={form.endDate}
                    onChange={onChange}
                    disabled={saving}
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
                    disabled={saving}
                    required
                />

                <TextField
                    name="trainerName"
                    label="Nama Trainer"
                    value={form.trainerName}
                    disabled={saving}
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
                    disabled={saving}
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

                <TextField
                    name="memo"
                    label="Keterangan"
                    value={form.memo}
                    onChange={onChange}
                    disabled={saving}
                    multiline
                    rows={3}
                    sx={{
                        gridColumn: "1 / -1"
                    }}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={form.useYn === "Y"}
                            onChange={(event) =>
                                onChange({
                                    target: {
                                        name: "useYn",
                                        value: event.target.checked ? "Y" : "N"
                                    }
                                })
                            }
                        />
                    }
                    label="Training Aktif"
                />

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
                    disabled={saving}
                    startIcon={saving ? <CircularProgress size={18} color="inherit" /> : null}
                >
                    {saving ? "Menyimpan..." : editingId ? "Simpan Perubahan" : "Simpan Training"}

                </AppButton>

            </DialogActions>

        </Dialog>

    );

}

export default TrainingDialog;