import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Center,
  Flex,
  Text,
  Image,
  Spacer,
  HStack,
  Button,
  Stack,
} from "@chakra-ui/react";

const Book = () => {
  const [book, setBook] = useState(undefined);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [bookId, setBookId] = useState(params.get("bookId"));
  console.log(bookId);
  const books = useSelector((state) => state.books.books);
  useEffect(() => {
    setBook(books.find((book) => book.id === bookId));
  }, [books, location, bookId]);
  console.log(book);
  if (book !== undefined) {
    return (
      <Stack p={10} spacing={25} maxW={"1600px"} mx='auto'>
        <Stack direction={["column", "column", "column", "row"]} spacing={10}>
          <Flex alignItems='center' flex='0.3' justifyContent={"center"}>
            <Image src={book.ImageUrl} width={["100%", "80%", "40%", "100%"]} />
          </Flex>
          <Box flex='0.6'>
            <Text fontSize={"5xl"}>{book.Title}</Text>
            <Text fontSize={"xl"}>{book.Author}</Text>
            <Text fontSize={"lg"}>Rating: {book.Rating}</Text>
            <Text fontSize={"lg"}>{book.Description}</Text>
            <Center>
              <Text fontSize={"3xl"} align='center' as='b' color='purple.800'>
                Price: {book.Price}
              </Text>
            </Center>
          </Box>
        </Stack>
        <Button colorScheme={"blue"} size='lg'>
          Purchase Book{" "}
        </Button>
      </Stack>
    );
  } else {
    return (
      <Center>
        <Text fontSize={"5xl"} color='gray.500'>
          No book found
        </Text>
      </Center>
    );
  }
};

export default Book;
