import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

const About = () => {
  const theme = useTheme();

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box>
      <Box
        sx={{
          margin: isNonMobile ? "2rem 5rem 2rem 5rem" : "1rem 2rem 1rem 2rem",
        }}
      >
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <AccordionSummary
            aria-controls='panel1d-content'
            id='panel1d-header'
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography
              fontSize='1.1rem'
              textDecoration='underline'
              fontWeight='bold'
              width='90%'
              color={theme.palette.secondary.main}
            >
              ABOUT EVENTOMANIA
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <AccordionSummary
            aria-controls='panel2d-content'
            id='panel2d-header'
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography
              fontSize='1.1rem'
              textDecoration='underline'
              fontWeight='bold'
              width='90%'
              color={theme.palette.secondary.main}
            >
              DEVELOPED BY
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default About;
