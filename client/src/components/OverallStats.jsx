import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import React, { useMemo } from "react";

const OverallStats = ({ data }) => {
  const isNonMobile = useMediaQuery("(min-width: 700px)");

  const theme = useTheme();
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
      {data && (
        <ResponsiveLine
          data={totalEventsLine}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary.main,
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary.main,
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary.main,
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary.main,
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.secondary.main,
              },
            },
            tooltip: {
              container: {
                color: theme.palette.secondary.contrast,
              },
            },
          }}
          colors={theme.palette.secondary.main}
          margin={{
            top: 20,
            right: 20,
            bottom: isNonMobile ? 45 : 30,
            left: isNonMobile ? 50 : 20,
          }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=' >-.2f'
          curve='catmullRom'
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
            legend: isNonMobile ? "Month" : "",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isNonMobile ? "Events" : "",
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
          motionConfig='slow'
        />
      )}
    </>
  );
};

export default OverallStats;
