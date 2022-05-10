import { Container, Heading, Box, Spinner, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { motion } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Slider from "./Slider";
import { fetchBooks } from "../Store/reducers/books";
import BookCardRegular from "./BookCardRegular";

const BooksPage = () => {
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      "(min-width: 600px)": {
        slides: { perView: 4, spacing: 5 },
      },
      "(min-width: 950px)": {
        slides: { perView: 3, spacing: 5 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 4, spacing: 15 },
      },
      "(min-width: 1600px)": {
        slides: { perView: 5, spacing: 15 },
      },
    },
  });

  const books = useSelector((state) => state.books.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);
  return (
    <>
      <Container maxW='1600px'>
        <Heading>Recent Additions</Heading>
        <Box py={4} />
        {books.length === 0 ? (
          <Spinner size='xl' />
        ) : (
          <Slider books={books.slice(-5)} />
        )}
        <Box py={4} />
        <Heading>All Books</Heading>
        <Box py={4} />
        {books.length === 0 ? (
          <Spinner size='xl' />
        ) : (
          <>
            <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} gap={6}>
              {books.map((book) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={book.id}
                >
                  <BookCardRegular book={book} />
                </motion.div>
              ))}
            </SimpleGrid>
          </>
        )}
      </Container>
    </>
  );
};

export default BooksPage;
