import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { Rings } from "react-loader-spinner";

const BreakdownChart = () => {
  const theme = useTheme();
  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];
  const [data, setData] = useState(null);
    useEffect(() => {
        const getEvents = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/dashboard/eventsPerCommittee`
                );

                setData(response.data.map((event, i) =>({
                  id: event.label,
                  label: event.label,
                  value: event.value,
                  color: colors[i],})
              ));

            } catch (error) {
                console.error(error);
            }
        };
        getEvents();
        // eslint-disable-next-line
    }, []);

  return (
    <Box
    height="400px"
    width={undefined}
    minHeight="325px"
    minWidth="325px"
    position="relative"
  >
    {data ? (<ResponsivePie
      data={data}
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
      arcLinkLabelsTextColor={theme.palette.secondary[200]}
      arcLinkLabelsThickness={1}
      arcLinkLabelsTextOffset={0}
      arcLinkLabelsStraightLength={10}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      legends={[
      ]}
    />): (
      <Box sx={{
        height:"100%",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
      }}> 
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
    <Box
      position="absolute"
      top="50%"
      left="50%"
      color={theme.palette.secondary[400]}
      textAlign="center"
      pointerEvents="none"
      sx={{
        transform: "translate(-75%, -170%)",
      }}
    >
      <Typography variant="h6">
        
      </Typography>
    </Box>
  </Box>
  )
}

export default BreakdownChart