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
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchBooks } from "../Store/reducers/books";

const ThankYouPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const params = new URLSearchParams(location.search);
  const [bookId, setBookId] = useState(params.get("bookId"));
  const [book, setBook] = useState(null);
  const books = useSelector((state) => state.books.books);

  useEffect(() => {
    setBookId(params.get("bookId"));
    dispatch(fetchBooks());
    if (bookId !== null || bookId !== undefined) {
      const tempBook = books.filter((book) => book.id === bookId);
      console.log(bookId);
      setBook(tempBook[0]);
      console.log(book);
    }
  }, [bookId, location]);

  if (book === undefined) {
    return <Spinner></Spinner>;
  } else {
    {
      return (
        <Container maxW={"container.lg"}>
          <Stack spacing={16} py={10}>
            <Text align={"center"} fontSize={"4xl"}>
              You have successfully purchased the book
            </Text>
            {book && (
              <Flex direction={"row"}>
                <Box flex='1' alignItems={"center"}>
                  <Image width={"70%"} src={book.ImageUrl} />
                </Box>
                <Box flex='1' justifyContent={"center"}>
                  <Stack>
                    <Text fontSize={"3xl"}>{book.Title}</Text>
                    <Text fontSize={"xl"}>{book.Author}</Text>
                    <Text fontSize={"xl"}>{book.Price}</Text>
                  </Stack>
                </Box>
              </Flex>
            )}
            <Button size='lg' colorScheme={"green"} onClick={handleClick}>
              <Text fontSize={"2xl"}>Return to the Home Screen</Text>
            </Button>
          </Stack>
        </Container>
      );
    }
  }
};

export default ThankYouPage;
