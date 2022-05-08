import { Box, Image, Text, Stack } from "@chakra-ui/react";
import React from "react";

const BookCardRegular = ({ book }) => {
  const { ImageUrl, Title, Author, Language, Price, Pages, Publisher, Rating } =
    book;
  return (
    <Box
      border={"1px solid black"}
      maxW={"sm"}
      minH={"lg"}
      borderRadius={"20px"}
      p={2}
    >
      <Stack spacing={2}>
        <Image
          src={ImageUrl}
          borderRadius={"20px 20px 0px 0px"}
          height='100%'
        />
        <Text fontSize='xl' as='b'>
          {Title}
        </Text>
        <Text fontSize='lg'>{Author}</Text>
        <Text fontSize='lg'>{Price}</Text>
        <Text fontSize='lg'>{Rating}</Text>
      </Stack>
    </Box>
  );
};

export default BookCardRegular;
