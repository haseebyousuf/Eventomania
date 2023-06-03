import {
    Box,
    Card,
    CardContent,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React from "react";

const RecommendedAudience = ({ event }) => {
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
                variant="h2"
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
                        event.recommendedAudience.split(",").map((e) => (
                            <Card
                                key={e}
                                sx={{
                                    borderRadius: "0.55rem",
                                    backgroundImage: "none",
                                    backgroundColor:
                                        theme.palette.background.alt,
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
                                        variant="h5"
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

export default RecommendedAudience;
