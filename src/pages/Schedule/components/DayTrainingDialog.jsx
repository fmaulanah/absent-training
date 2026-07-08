import dayjs from "dayjs";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Divider,
    Typography
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

function DayTrainingDialog({ open, date, trainings, onClose, onSelectTraining}) 
{
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
                    alignItems: "center",
                    fontWeight: 700
                }}
            >

                {dayjs(date).format("DD MMMM YYYY")}

                <IconButton onClick={onClose}>

                    <CloseIcon />

                </IconButton>

            </DialogTitle>

            <DialogContent
                dividers
                sx={{
                    p: 0
                }}
            >

                <List disablePadding>

                    {trainings.map((training, index) => (

                        <div key={training.id}>

                            <ListItemButton
                                onClick={() => {

                                    onClose();
                                    onSelectTraining(training);

                                }}
                                sx={{

                                    bgcolor: training.useYn === "N" ? "grey.100" : "background.paper",
                                    "&:hover": {
                                        bgcolor: training.useYn === "N" ? "grey.200" : "action.hover"
                                    }

                                }}
                            >

                                <ListItemText

                                    primary={training.title}
                                    secondary={
                                        <>
                                            <Typography
                                                variant="body2"
                                                component="span"
                                            >
                                                {training.trainerName}
                                            </Typography>

                                            <br />

                                            <Typography
                                                variant="caption"
                                                component="span"
                                            >
                                                {training.roomName}
                                            </Typography>
                                        </>
                                    }

                                />

                            </ListItemButton>

                            {index < trainings.length - 1 && (

                                <Divider />

                            )}

                        </div>

                    ))}

                </List>

            </DialogContent>

        </Dialog>

    );

}

export default DayTrainingDialog;