import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const BookCard = {
    backgroundImage: `url(${book.ImageUrl})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    marginInline: "auto",
  };

  const divStyle = {
    maxWidth: "500px",
  };

  const handleClick = () => {
    navigate(`/book?bookId=${book.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, zIndex: 1000, origin: 0 }}
      whileTap={{ scale: 0.95 }}
      animate={{ origin: 0 }}
      style={divStyle}
      onClick={handleClick}
    >
      <Box
        borderRadius={"20px"}
        p={2}
        maxW={"sm"}
        style={BookCard}
        minH='500px'
      ></Box>
    </motion.div>
  );
};

export default BookCard;
