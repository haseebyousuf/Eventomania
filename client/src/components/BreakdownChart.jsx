import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";

const BreakdownChart = ({ data, totalEvents }) => {
  const theme = useTheme();

  const [pieData, setPieData] = useState(null);
  useEffect(() => {
    const colors = [
      theme.palette.chart.main,
      theme.palette.chart.light,
      theme.palette.chart.dark,
      theme.palette.chart.main,
      theme.palette.chart.light,
      theme.palette.chart.main,
      theme.palette.chart.dark,
      theme.palette.chart.main,
    ];
    setPieData(
      data.map((event, i) => ({
        id: event.label,
        label: event.label,
        value: event.value,
        color: colors[i],
      }))
    );
  }, [
    data,
    theme.palette.chart.main,
    theme.palette.chart.light,
    theme.palette.chart.dark,
  ]);

  return (
    <Box
      height='400px'
      width={undefined}
      minHeight='325px'
      minWidth='325px'
      position='relative'
    >
      {data && (
        <ResponsivePie
          data={pieData}
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
                color: theme.palette.secondary.contrast,
              },
            },
          }}
          colors={{ datum: "data.color" }}
          margin={{ top: 40, right: 80, bottom: 100, left: 50 }}
          sortByValue={true}
          startAngle={289}
          endAngle={-360}
          innerRadius={0.45}
          padAngle={1}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          enableArcLinkLabels={true} //check false also
          arcLinkLabelsTextColor={theme.palette.secondary.accent}
          arcLinkLabelsThickness={1}
          arcLinkLabelsTextOffset={0}
          arcLinkLabelsStraightLength={10}
          arcLinkLabelsColor={theme.palette.secondary.accent}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={theme.palette.primary.main}
          legends={[]}
        />
      )}
      <Box
        position='absolute'
        top='50%'
        left='50%'
        color={theme.palette.secondary.dark}
        textAlign='center'
        pointerEvents='none'
        sx={{
          transform: "translate(-75%, -170%)",
        }}
      >
        <Typography variant='h6'>{`Total: ${totalEvents}`}</Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
