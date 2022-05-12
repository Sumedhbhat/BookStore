import {
  SimpleGrid,
  Box,
  Container,
  Text,
  Center,
  Button,
  Stack,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { useState } from "react";
import { useSelector } from "react-redux";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/books");
  };

  const book = useSelector((state) =>
    state.books.books.find((book) => book.id === "kxwk1T6yYnbIrq9ErDGu")
  );
  if (book === undefined) {
    return <Spinner></Spinner>;
  } else {
    return (
      <Container maxW={"container.lg"}>
        <Stack spacing={16} py={40}>
          <Text align={"center"} fontSize={"4xl"}>
            You have successfully purchased the book
          </Text>
          <Stack direction={"column"}>
            <Box>
              <Image src='' />
            </Box>
            <Box>
              <Stack>
                <Text fontSize={"xl"}>{book.title}</Text>
                <Text fontSize={"xl"}>{book.author}</Text>
                <Text fontSize={"xl"}>{book.price}</Text>
              </Stack>
            </Box>
          </Stack>
          <Button size='lg' colorScheme={"green"} onClick={handleClick}>
            <Text fontSize={"2xl"}>Return to the Home Screen</Text>
          </Button>
        </Stack>
      </Container>
    );
  }
};

export default ThankYouPage;
