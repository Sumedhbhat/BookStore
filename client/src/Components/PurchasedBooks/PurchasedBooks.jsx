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

const PurchasedBooks = () => {
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
              newBooks.push(book.data());
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
    console.log(auth.currentUser);
    if (user) {
      setLoggedIn(true);
    }
    if (loggedIn) {
      getPurchasedBooks();
    }
  }, [user, auth]);

  useEffect(() => {
    console.log(books, user, auth.currentUser, loggedIn);
  });
  return (
    <>
      <Center>
        <Heading>
          Books Purchased by {auth.currentUser && auth.currentUser.displayName}
        </Heading>
      </Center>
      <SimpleGrid
        p={10}
        columns={[1, 1, 2, 3, 4]}
        key={`count${count}`}
        spacing={8}
      >
        {books &&
          books.map((book) => (
            <Box
              mx='auto'
              key={book.id}
              style={{
                backgroundImage: `url(${book.ImageUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundBlendMode: "multiply",
              }}
              height='500px'
              width='300px'
            >
              <Box background={"rgba(0,0,0,0.8)"} height='inherit'>
                <Flex
                  flexDirection={"column"}
                  justifyContent='flex-end'
                  opacity={1}
                  mt='auto'
                >
                  <Spacer />
                  <Heading color={"white"}>{book.Title}</Heading>
                  <Text>{book.Author}</Text>
                  <Text isTruncated noOfLines={3} flexWrap>
                    {book.Description}
                  </Text>
                </Flex>
              </Box>
            </Box>
          ))}
      </SimpleGrid>
    </>
  );
};

export default PurchasedBooks;
