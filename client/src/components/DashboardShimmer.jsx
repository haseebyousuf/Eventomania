import {
  Box,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const DashboardShimmer = ({ isNonMediumScreens }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const theme = useTheme();

  return (
    <Box m='1.5rem 2.5rem'>
      <Box width={isNonMobile ? "25%" : "40%"}>
        <Typography variant='h2'>
          <Skeleton />
        </Typography>
        <Typography sx={{ mb: "5px" }} variant='h5'>
          <Skeleton />
        </Typography>
      </Box>

      <Box
        mt='20px'
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows='160px'
        gap='20px'
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? undefined : "span 12",
          },
        }}
      >
        <Box
          gridColumn='span 2'
          gridRow='span 1'
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          p='1.25rem 1rem'
          flex='1 1 100%'
          backgroundColor={theme.palette.background.alt}
          borderRadius='0.55rem'
        >
          <Skeleton height='100%' />
        </Box>
        <Box
          gridColumn='span 2'
          gridRow='span 1'
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          p='1.25rem 1rem'
          flex='1 1 100%'
          backgroundColor={theme.palette.background.alt}
          borderRadius='0.55rem'
        >
          <Skeleton height='100%' />
        </Box>
        <Box
          gridColumn='span 8'
          gridRow='span 2'
          backgroundColor={theme.palette.background.alt}
          p='1rem'
          borderRadius='0.55rem'
        >
          <Skeleton height='100%' />
        </Box>
        <Box
          gridColumn='span 2'
          gridRow='span 1'
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          p='1.25rem 1rem'
          flex='1 1 100%'
          backgroundColor={theme.palette.background.alt}
          borderRadius='0.55rem'
        >
          <Skeleton height='100%' />
        </Box>
        <Box
          gridColumn='span 2'
          gridRow='span 1'
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          p='1.25rem 1rem'
          flex='1 1 100%'
          backgroundColor={theme.palette.background.alt}
          borderRadius='0.55rem'
        >
          <Skeleton height='100%' />
        </Box>

        <Box
          gridColumn='span 7'
          gridRow='span 3'
          backgroundColor={theme.palette.background.alt}
        >
          <Skeleton />
        </Box>
        <Box
          gridColumn='span 5'
          gridRow='span 3'
          backgroundColor={theme.palette.background.alt}
          p='1.5rem'
          borderRadius='0.55rem'
        >
          <Typography variant='h6' sx={{ color: theme.palette.secondary[100] }}>
            <Skeleton />
          </Typography>
          <Skeleton />
          <Typography
            p='0 0.6rem'
            fontSize='0.8rem'
            sx={{ color: theme.palette.secondary[200] }}
          >
            <Skeleton />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardShimmer;
