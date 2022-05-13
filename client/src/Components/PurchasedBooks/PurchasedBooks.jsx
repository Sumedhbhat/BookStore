import {
  Stack,
  SimpleGrid,
  Text,
  Heading,
  Center,
  Box,
} from "@chakra-ui/react";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { db, app } from "../../firebase";

const PurchasedBooks = () => {
  let auth = getAuth(app);
  const [count, setCount] = useState(0);
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(auth.currentUser);

  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth]);

  useEffect(() => {
    if (user !== null) {
      getPurchasedBooks();
    }
    console.log(user);
  }, [user]);

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
    setUser(auth.currentUser);
    if (user) {
      setLoggedIn(true);
    }
    if (loggedIn) {
      getPurchasedBooks();
    }
  }, [user, auth]);

  useEffect(() => {
    auth = getAuth(app);
    console.log(books, user, auth.currentUser, loggedIn, app);
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
              key={book.id}
              style={{
                backgroundImage: `url(${book.ImageUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              height='500px'
            >
              <Stack>
                <Text>{book.title}</Text>
                <Text>{book.author}</Text>
                <Text>{book.genre}</Text>
                <Text isTruncated>{book.description}</Text>
              </Stack>
            </Box>
          ))}
      </SimpleGrid>
    </>
  );
};

export default PurchasedBooks;
