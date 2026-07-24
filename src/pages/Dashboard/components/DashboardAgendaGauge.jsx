import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";

import {
    ResponsiveContainer,
    RadialBarChart,
    RadialBar,
    PolarAngleAxis
} from "recharts";

function DashboardAgendaGauge({ total, running, isMobile}) 
{
    const percent = total === 0 ? 0 : Math.round((running / total) * 100);

    const data = [

        {

            name: "Running",

            value: percent,

            fill: "#1B0A6B"

        }

    ];

    return (

        <Card
            sx={{
                borderRadius: 3,
                height: "100%"
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={600}
                    mb={3}
                >

                    Agenda Berjalan

                </Typography>

                <Box
                    sx={{
                        height: isMobile ? 220 : 320
                    }}
                >

                    <ResponsiveContainer>

                        <RadialBarChart

                            innerRadius="70%"

                            outerRadius="100%"

                            barSize={16}

                            data={data}

                            startAngle={90}

                            endAngle={-270}

                        >

                            <PolarAngleAxis

                                type="number"

                                domain={[0, 100]}

                                angleAxisId={0}

                                tick={false}

                            />

                            <RadialBar
                                background
                                dataKey="value"
                                cornerRadius={10}
                            />

                        </RadialBarChart>

                    </ResponsiveContainer>

                </Box>

                <Box
                    sx={{
                        mt: -2,
                        textAlign: "center"
                    }}
                >

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >

                        {percent}%

                    </Typography>

                    <Typography
                        color="text.secondary"
                    >

                        {running} / {total} Agenda

                    </Typography>

                </Box>

            </CardContent>

        </Card>

    );

}

export default DashboardAgendaGauge;