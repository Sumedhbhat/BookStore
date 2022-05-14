import { useState, useEffect } from "react";
import { Center, SimpleGrid, Box, Flex, Text, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../Store/reducers/books";
import BookCardRegular from "../BooksPage/BookCardRegular";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search");
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
  const [results, setResults] = useState(books);

  useEffect(() => {
    setResults(
      books.filter(
        (book) =>
          book.Title.toLowerCase().includes(search.toLowerCase()) ||
          book.Author.toLowerCase().includes(search.toLowerCase()) ||
          book.Description.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);
  useEffect(() => {
    dispatch(fetchBooks());
  }, []);
  return (
    <Box px={13}>
      <SimpleGrid columns={[1, 2, 3]} spacing={10} px={10}>
        {results && results.length > 0 ? (
          results.map((book) => <BookCardRegular book={book} key={book.id} />)
        ) : (
          <Center>
            <Text size={"5xl"}>No Books Found</Text>
          </Center>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default SearchPage;
