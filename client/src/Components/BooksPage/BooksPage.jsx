import {
  Container,
  Heading,
  Box,
  Spinner,
  Skeleton,
  SkeletonText,
  Grid,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import BookCard from "./BookCard";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Slider from "./Slider";
import BookCardRegular from "./BookCardRegular";

const BooksPage = () => {
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

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "books"));
      console.log(querySnapshot);
      const booksArray = [];
      querySnapshot.forEach((doc) => {
        if (doc !== undefined || doc !== null) {
          const arr = { id: doc.id, ...doc.data() };
          if (booksArray.find((book) => book.id === arr.id) === undefined) {
            booksArray.push(arr);
          }
        }
      });
      setBooks(booksArray);
    };
    getData();
  }, []);
  return (
    <>
      <Container maxW='container.lg'>
        <Heading>Recent Additions</Heading>
        <Box py={4} />
        {books.length === 0 ? <Spinner size='xl' /> : <Slider books={books} />}
        <Box py={4} />
        <Heading>All Books</Heading>
        <Box py={4} />
        {books.length === 0 ? (
          <Spinner size='xl' />
        ) : (
          <>
            <Grid container>
              {books.map((book) => (
                <BookCardRegular book={book} key={book.id} />
              ))}
            </Grid>
          </>
        )}
      </Container>
    </>
  );
};

export default BooksPage;
