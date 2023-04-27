import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const RecomendedAudiance = ({ event }) => {
  const mode = useSelector((state) => state.mode);
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  return (
    <>
      {/* <Box
        mt={2}
        mb={2}
        height="3rem"
        pl={1}
        width={isNonMobile ? "90%" : "100%"}
        sx={{
          borderRadius: "5px",
          backgroundColor: theme.palette.background.alt,
        }}
      > */}
      <Typography
        mt={2}
        fontSize="1.7rem"
        varient="h2"
        fontWeight="bold"
        color="secondary"
      >
        This Event Is For
      </Typography>
      {/* </Box> */}
      <Box mt={1} pb={2} mb={2} width={isNonMobile ? "90%" : "100%"}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            "& .MuiCardContent-root:last-child": {
              paddingBottom: "16px",
            },
          }}
        >
          {event &&
            event.recomendedAudiance.split(",").map((e) => (
              <Card
                key={e}
                sx={{
                  backgroundColor:
                    mode === "dark"
                      ? "transparent"
                      : theme.palette.background.alt,
                }}
              >
                <CardContent
                  d="flex"
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    fontSize="1.1rem"
                    textTransform="uppercase"
                    varient="h5"
                  >
                    {e}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default RecomendedAudiance;
