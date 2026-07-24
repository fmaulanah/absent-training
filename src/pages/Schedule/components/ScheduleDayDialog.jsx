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

function ScheduleDayDialog({ open, date, agendas, onClose, onSelectAgenda}) 
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
                    alignitems: "center",
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

                    {agendas.map((agenda, index) => (

                        <div key={agenda.id}>

                            <ListItemButton
                                onClick={() => {

                                    onClose();
                                    onSelectAgenda(agenda);

                                }}
                                sx={{

                                    bgcolor: agenda.useYn === "N" ? "grey.100" : "background.paper",
                                    "&:hover": {
                                        bgcolor: agenda.useYn === "N" ? "grey.200" : "action.hover"
                                    }

                                }}
                            >

                                <ListItemText

                                    primary={agenda.title}
                                    secondary={
                                        <>
                                            <Typography
                                                variant="body2"
                                                component="span"
                                            >
                                                {agenda.trainerName}
                                            </Typography>

                                            <br />

                                            <Typography
                                                variant="caption"
                                                component="span"
                                            >
                                                {agenda.roomName}
                                            </Typography>
                                        </>
                                    }

                                />

                            </ListItemButton>

                            {index < agendas.length - 1 && (

                                <Divider />

                            )}

                        </div>

                    ))}

                </List>

            </DialogContent>

        </Dialog>

    );

}

export default ScheduleDayDialog;