import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const EventDescription = ({ description }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <>
      <Typography
        fontSize='1.7rem'
        variant='h2'
        fontWeight='bold'
        color='secondary'
      >
        About This Event
      </Typography>
      <Box mt={1} width={isNonMobile ? "90%" : "100%"}>
        <Card
          sx={{
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <CardContent>
            <Typography textAlign='justify' fontSize='1rem'>
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default EventDescription;
