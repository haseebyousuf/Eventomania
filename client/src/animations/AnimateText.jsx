import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const AnimateText = ({ text, delayValue }) => {
  const characters = [...text];
  return (
    <AnimatePresence>
      {characters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          exit={{ opacity: 0 }}
          transition={{ delay: index * delayValue, duration: 0.5 }}
        >
          {letter}
        </motion.span>
      ))}
    </AnimatePresence>
  );
};

export default AnimateText;
