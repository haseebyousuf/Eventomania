import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AnimateText from "animations/AnimateText";
import { motion } from "framer-motion";
import React from "react";
import ImageGallery from "react-image-gallery";

const EventImages = ({ photos }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  //set image data
  const images = photos.map((photo) => {
    return {
      original: `${process.env.REACT_APP_BASE_URL}assets/${photo.filename}`,
      thumbnail: `${process.env.REACT_APP_BASE_URL}assets/${photo.filename}`,
    };
  });

  return (
    <Box sx={{ display: "block", overflow: "auto" }} marginBottom='1rem'>
      <Card
        sx={{
          padding: "0rem 0.7rem",
          borderRadius: "0.55rem",
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <CardContent>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='flex-start'
            flexDirection='column'
          >
            <Typography
              fontSize={isNonMobile ? "1.6rem" : "1.2rem"}
              textDecoration='underline'
              fontWeight='bold'
              p='0.3rem 0rem 1rem 0rem'
              color='#d12121'
            >
              <AnimateText text='EVENT CONCLUDED!' delayValue={0.05} />
            </Typography>
          </Box>
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, ease: "easeInOut" }}
          >
            <ImageGallery
              items={images}
              showNav={true}
              showThumbnails={false}
              autoPlay={true}
              showPlayButton={false}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventImages;
