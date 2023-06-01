import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Rings } from "react-loader-spinner";

const OverallStats = () => {
    const theme = useTheme();
    const [data, setData] = useState(null);
    useEffect(() => {
        const getEvents = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/events/eventsPerMonth`
                );

                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getEvents();
    }, []);

    const totalEventsLine = useMemo(() => {
        if (data) {
            return [
                {
                    id: "totalEvents",
                    color: theme.palette.secondary.main,
                    data: data,
                },
            ];
        }

        return [];
    }, [data, theme.palette.secondary.main]);

    return (
        <>
            {data ? (
                <ResponsiveLine
                    data={totalEventsLine}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: theme.palette.secondary[200],
                                },
                            },
                            legend: {
                                text: {
                                    fill: theme.palette.secondary[200],
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: theme.palette.secondary[200],
                                    strokeWidth: 1,
                                },
                                text: {
                                    fill: theme.palette.secondary[200],
                                },
                            },
                        },
                        legends: {
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                        tooltip: {
                            container: {
                                color: theme.palette.primary.main,
                            },
                        },
                    }}
                    margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: false,
                        reverse: false,
                    }}
                    yFormat=" >-.2f"
                    curve="catmullRom"
                    enableArea={true}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        format: (v) => {
                            return v;
                        },
                        orient: "bottom",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Month",
                        legendOffset: 36,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        orient: "left",
                        tickValues: 5,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Events",
                        legendOffset: -40,
                        legendPosition: "middle",
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    pointSize={10}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={undefined}
                    motionConfig="slow"
                />
            ) : (
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Rings
                        height="100"
                        width="100"
                        color={theme.palette.secondary.main}
                        radius="6"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="rings-loading"
                    />
                </Box>
            )}
        </>
    );
};

export default OverallStats;
