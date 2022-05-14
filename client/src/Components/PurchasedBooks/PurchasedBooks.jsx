import {
  Stack,
  SimpleGrid,
  Text,
  Heading,
  Center,
  Box,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PurchasedBooks = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      console.log(data);
      setUser(data);
      if (data) {
        setLoggedIn(true);
      }
    });
  }, []);

  const getPurchasedBooks = async () => {
    if (!loggedIn) {
      return;
    } else {
      await getDoc(doc(db, "users", auth.currentUser.uid)).then(
        async (result) => {
          const purchasedBooks = result.data().purchasedBooks;
          console.log(result);
          const newBooks = [];
          console.log(books);
          for (let i = 0; i < purchasedBooks.length; i++) {
            const book = await getDoc(doc(db, "books", purchasedBooks[i]));
            if (
              books.find((book) => book.id === purchasedBooks[i]) === undefined
            ) {
              newBooks.push({ ...book.data(), id: book.id });
              console.log(newBooks);
            }
            console.log(purchasedBooks);
          }

          setBooks(newBooks);
          setCount((prev) => prev + 1);
          console.log(books);
        }
      );
    }
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      setLoggedIn(true);
    }
    if (loggedIn) {
      getPurchasedBooks();
    }
    console.log(books);
  }, [user, auth]);

  useEffect(() => {
    console.log(books, user, auth.currentUser, loggedIn);
  });
  return (
    <>
      <Center>
        <Heading>Books Purchased by {user && user.displayName}</Heading>
      </Center>
      <SimpleGrid
        p={10}
        columns={[1, 1, 2, 3, 4]}
        key={`count${count}`}
        spacing={8}
      >
        {books &&
          books.map((book) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={book.id}
            >
              <Box
                mx='auto'
                style={{
                  backgroundImage: `url(${book.ImageUrl})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundBlendMode: "multiply",
                }}
                borderRadius={"20px"}
                height='500px'
                width='300px'
                onClick={() => {
                  navigate(`/book?bookId=${book.id}`);
                }}
              >
                <Box
                  background={"rgba(0,0,0,0.65)"}
                  height='inherit'
                  borderRadius={"20px"}
                >
                  <Flex
                    height={"inherit"}
                    flexDirection={"column"}
                    justifyContent='flex-end'
                    opacity={1}
                    placeItems='bottom'
                    p={3}
                  >
                    <Box flex='1' />
                    <Heading color={"white"}>{book.Title}</Heading>
                    <Text color={"white"}>{book.Author}</Text>
                    <Text noOfLines={3} color={"white"}>
                      {book.Description}
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </motion.div>
          ))}
      </SimpleGrid>
    </>
  );
};

export default PurchasedBooks;
