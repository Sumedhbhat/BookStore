import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
const BookCard = ({ book }) => {
  const BookCard = {
    backgroundImage: `url(${book.ImageUrl})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  const divStyle = {
    maxWidth: "500px",
  };
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ originX: 0 }}
      style={divStyle}
    >
      <Box
        borderRadius={"20px"}
        p={2}
        maxW={"sm"}
        style={BookCard}
        minH='500px'
      >
        <Text fontSize='xl' as='b'>
          {book.Title}
        </Text>
        <Text fontSize='lg'>{book.Author}</Text>
      </Box>
    </motion.div>
  );
};

export default BookCard;
