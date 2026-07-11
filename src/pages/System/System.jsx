import { useState } from "react";
import dayjs from "dayjs";

import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

import PageHeader from "../../components/common/PageHeader/PageHeader";
import AppButton from "../../components/common/Button/AppButton";
import LoadingOverlay from "../../components/common/Loading/LoadingOverlay";

import useSnackbar from "../../hooks/useSnackbar";

import userService from "../../services/employeeService";

import { getStorage, setStorage, removeStorage } from "../../utils/storage";
import STORAGE_KEYS from "../../utils/storageKeys";

function System() {

    const [loading, setLoading] = useState(false);

    const { showSnackbar } = useSnackbar();

    const employees = getStorage(

        STORAGE_KEYS.EMPLOYEE,
        []

    );

    const totalUser = employees.length;

    const lastSync = getStorage(

        STORAGE_KEYS.USER_LAST_SYNC,
        null

    );

    const handleRefreshUser = async () => {

        try {

            setLoading(true);

            await userService.refreshEmployees();

            showSnackbar(

                "Data user berhasil diperbarui.",

                "success"

            );

            setStorage(

                STORAGE_KEYS.USER_LAST_SYNC,

                new Date().toISOString()

            );

        }
        catch (error) {

            console.error(error);

            showSnackbar(

                "Gagal memperbarui data user.",

                "error"

            );

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <>

            <LoadingOverlay open={loading} />

            <PageHeader
                title="System"
                subtitle="Maintenance dan sinkronisasi data aplikasi."
            />

            <Box>

                <Grid
                    container
                    spacing={3}
                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Card
                            elevation={2}
                            sx={{
                                borderRadius: 3,
                                height: "100%"
                            }}
                        >

                            <CardContent>

                                <Stack spacing={2}>

                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >

                                        <PersonIcon
                                            color="primary"
                                            sx={{
                                                fontSize: 42
                                            }}
                                        />

                                        <Chip

                                            label={loading ? "Updating..." : "Ready"}
                                            color={loading ? "warning" : "success"}
                                            size="small"

                                        />

                                    </Stack>

                                    <Box>

                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                        >

                                            Data User

                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >

                                            Sinkronisasi ulang data master user dari server
                                            ke Local Storage.

                                        </Typography>

                                    </Box>

                                    <Stack spacing={1}>

                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                        >

                                            <Typography color="text.secondary">

                                                Total User : {totalUser.toLocaleString()}

                                            </Typography>

                                        </Stack>

                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                        >

                                            <Typography color="text.secondary">

                                                Last Sync : {lastSync
                                                    ? dayjs(lastSync).format("DD MMM YYYY HH:mm")
                                                    : "-"}

                                            </Typography>

                                        </Stack>

                                    </Stack>

                                    <Divider />

                                    <AppButton
                                        fullWidth
                                        startIcon={<RefreshIcon />}
                                        onClick={handleRefreshUser}
                                        disabled={loading}
                                    >

                                        Update Data User

                                    </AppButton>

                                </Stack>

                            </CardContent>

                        </Card>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Card
                            elevation={2}
                            sx={{
                                borderRadius: 3,
                                height: "100%"
                            }}
                        >

                            <CardContent>

                                <Stack spacing={2}>

                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >

                                        <InfoOutlinedIcon
                                            color="primary"
                                            sx={{
                                                fontSize: 42
                                            }}
                                        />

                                        <Chip
                                            label="Development"
                                            color="info"
                                            size="small"
                                        />

                                    </Stack>

                                    <Box>

                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                        >

                                            Informasi Aplikasi

                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >

                                            Informasi build aplikasi yang sedang digunakan.

                                        </Typography>

                                    </Box>

                                    <Divider />

                                    <Stack spacing={1}>

                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                        >

                                            <Typography>

                                                v{import.meta.env.VITE_APP_VERSION} (Build {import.meta.env.VITE_APP_BUILD})

                                            </Typography>

                                        </Stack>

                                    </Stack>

                                </Stack>

                            </CardContent>

                        </Card>

                    </Grid>

                </Grid>

            </Box>

        </>

    );

}

export default System;