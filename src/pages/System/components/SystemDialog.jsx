import { useEffect, useState } from "react";

import {
    Box,
    Divider,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import CircularProgress from "@mui/material/CircularProgress";

import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/Delete";

import AppButton from "../../../components/common/Button/AppButton";
import ConfirmDialog from "../../../components/common/ConfirmDialog";

import koreanService from "../../../services/koreanService";

function SystemDialog({
    open,
    onClose,
    onSaved,
    onDeleted,
    onDeleteError,

    form,
    setForm,

    onSearchEmployee,
    onEmployeeKeyDown,
    onChange,
}) {

    const [saving, setSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedCoach, setSelectedCoach] = useState(null);
    const [rows, setRows] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);

    const loadCoach = async () => {

        try {

            setLoadingTable(true);

            const result = await koreanService.refreshKoreans();

            setRows(result);

        }
        catch (err) {

            console.error(err);

        }
        finally {

            setLoadingTable(false);

        }

    };

    const handleChange = (event) => {

        setIsDirty(true);

        const { name, value } = event.target;

        setForm(current => ({

            ...current,

            [name]: value

        }));

    };

    const handleClose = () => {

        if (!isDirty) {

            onClose();

            return;

        }

        setConfirmOpen(true);

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);

            await koreanService.saveCoach(form);

            await loadCoach();

            setForm({

                empId: "",
                empName: "",
                rfid: ""

            });

            setIsDirty(false);

            onSaved?.();
            

        }
        catch (err) {

            console.error(err);
            onSaveError?.();

        }
        finally {

            setSaving(false);

        }

    };

    const handleDelete = (row) => {

        setSelectedCoach(row);

        setDeleteOpen(true);

    };

    const handleConfirmDelete = async () => {

        if (!selectedCoach) {

            return;

        }

        try {

            setSaving(true);

            await koreanService.deleteCoach(

                selectedCoach.EMPID

            );

            await loadCoach();

            onDeleted?.();

        }
        catch (err) {

            console.error(err);

            onDeleteError?.();

        }
        finally {

            setSaving(false);

            setDeleteOpen(false);

            setSelectedCoach(null);

        }

    };

    const columns = [

        {
            field: "EMPID",
            headerName: "NIK",
            width: 120
        },

        {
            field: "EMP_NAME",
            headerName: "Nama",
            flex: 1,
            minWidth: 250
        },

        {
            field: "RF_ID",
            headerName: "RFID",
            width: 180
        },

        {
            field: "action",
            headerName: "",
            width: 70,
            sortable: false,
            filterable: false,
            align: "center",

            renderCell: ({ row }) => (

                <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDelete(row)}
                >

                    <DeleteOutlineIcon/>

                </IconButton>

            )

        }

    ];

    useEffect(() => {

        if (!open) {

            return;

        }

        loadCoach();

    }, [open]);

    return (

        <>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
                component="form"
                onSubmit={handleSubmit}
                PaperProps={{
                    sx: {
                        minHeight: "82vh"
                    }
                }}
            >

                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignitems: "center",
                        fontWeight: 600
                    }}
                >

                    Input Data Korean Coach

                    <IconButton
                        onClick={handleClose}
                        size="small"
                    >

                        <CloseIcon />

                    </IconButton>

                </DialogTitle>

                <DialogContent
                    sx={{
                        pt: "12px !important"
                    }}
                >

                    <Stack spacing={3}>

                        <Grid
                            container
                            spacing={2}
                        >

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    label="NIK"
                                    name="empId"
                                    value={form.empId}
                                    onChange={onChange}
                                    onBlur={onSearchEmployee}
                                    onKeyDown={onEmployeeKeyDown}
                                    required
                                    disabled={saving}
                                />

                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    label="Nama"
                                    name="empName"
                                    value={form.empName}
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

                            </Grid>

                            <Grid size={{ xs: 12 }}>

                                <TextField
                                    fullWidth
                                    label="RFID"
                                    name="rfid"
                                    value={form.rfid}
                                    onChange={handleChange}
                                    required
                                    disabled={saving}
                                />

                            </Grid>

                        </Grid>

                        <Box
                            display="flex"
                            justifycontent="flex-end"
                        >

                            <AppButton
                                type="submit"
                                disabled={saving}
                                startIcon={
                                    saving
                                        ? <CircularProgress size={18} color="inherit" />
                                        : null
                                }
                            >

                                {saving ? "Menyimpan..." : "Simpan"}

                            </AppButton>

                        </Box>

                        <Divider />

                        <Typography
                            variant="h6"
                            fontWeight={600}
                        >

                            Daftar Korean Coach

                        </Typography>

                        <Box
                            sx={{
                                height: 420
                            }}
                        >

                            <DataGrid
                                rows={rows}
                                columns={columns}
                                loading={loadingTable}
                                getRowId={(row) => row.EMPID}
                                disableRowSelectionOnClick
                                pageSizeOptions={[5, 10]}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5
                                        }
                                    }
                                }}
                            />

                        </Box>

                    </Stack>

                </DialogContent>

            </Dialog>

            <ConfirmDialog

                open={confirmOpen}

                title="Perubahan Belum Disimpan"

                message="Perubahan yang sudah Anda lakukan akan hilang. Tetap keluar?"

                confirmText="Keluar"

                cancelText="Kembali"

                onConfirm={() => {

                    setConfirmOpen(false);

                    setIsDirty(false);

                    onClose();

                }}

                onCancel={() =>

                    setConfirmOpen(false)

                }

            />

            <ConfirmDialog

                open={deleteOpen}

                title="Hapus Korean Coach"

                message={`Yakin ingin menghapus ${selectedCoach?.EMP_NAME ?? ""}?`}

                confirmText="Hapus"

                cancelText="Batal"

                onConfirm={handleConfirmDelete}

                onCancel={() => {

                    setDeleteOpen(false);

                    setSelectedCoach(null);

                }}

            />

        </>

    );

}

export default SystemDialog;