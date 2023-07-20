import { Box } from "@mui/material";
import React from "react";
import ImageGallery from "react-image-gallery";

const EventImages = ({ photos }) => {
  const images = photos.map((photo) => {
    return {
      original: `${process.env.REACT_APP_BASE_URL}/assets/${photo.filename}`,
      thumbnail: `${process.env.REACT_APP_BASE_URL}/assets/${photo.filename}`,
    };
  });
  console.log(images);
  return (
    <Box height='25rem' marginBottom='1rem'>
      <ImageGallery
        items={images}
        showNav={true}
        showThumbnails={false}
        autoPlay={true}
        showPlayButton={false}
      />
    </Box>
  );
};

export default EventImages;
