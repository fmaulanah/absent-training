import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

function DashboardMonthlyChart({ data, isMobile })
{

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

                    Training Bulanan

                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={isMobile ? 170 : 280}
                >

                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: isMobile ? 5 : 20,
                            left: isMobile ? -25 : 0,
                            bottom: 0
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="month"
                        />

                        <YAxis
                            allowDecimals={false}
                            width={isMobile ? 20 : 40}
                        />

                        <Tooltip
                            wrapperStyle={{
                                fontSize: 12
                            }}
                        />

                        <Bar
                            dataKey="total"
                            radius={[8,8,0,0]}
                            fill="#28127C"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}

export default DashboardMonthlyChart;