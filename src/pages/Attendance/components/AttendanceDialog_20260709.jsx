import { useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    IconButton,
    TextField,
    Typography
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import AppButton from "../../../components/common/Button/AppButton";

function AttendanceDialog({

    open,

    training,

    onClose

}) {

    const [rfid, setRfid] = useState("");

    if (!training) return null;

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignitems: "center"
                }}
            >

                Attendance

                <IconButton onClick={onClose}>

                    <CloseIcon />

                </IconButton>

            </DialogTitle>

            <DialogContent dividers>

                <Grid
                    container
                    spacing={2}
                >

                    <Grid size={12}>

                        <Typography variant="caption">

                            Training

                        </Typography>

                        <Typography fontWeight={700}>

                            {training.title}

                        </Typography>

                    </Grid>

                    <Grid size={6}>

                        <Typography variant="caption">

                            Trainer

                        </Typography>

                        <Typography>

                            {training.trainerName}

                        </Typography>

                    </Grid>

                    <Grid size={6}>

                        <Typography variant="caption">

                            Ruangan

                        </Typography>

                        <Typography>

                            {training.roomName}

                        </Typography>

                    </Grid>

                    <Grid size={12}>

                        <TextField
                            autoFocus
                            fullWidth
                            label="RFID / NIK"
                            placeholder="Scan RFID atau masukkan NIK..."
                            value={rfid}
                            onChange={(event) =>
                                setRfid(event.target.value)
                            }
                        />

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <AppButton
                    variant="outlined"
                    onClick={onClose}
                >

                    Tutup

                </AppButton>

            </DialogActions>

        </Dialog>

    );

}

export default AttendanceDialog;