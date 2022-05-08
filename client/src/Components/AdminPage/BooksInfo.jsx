import { useEffect, useState, useRef } from "react";
import { storage, db } from "../../firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
  Button,
  Center,
} from "@chakra-ui/react";
import BookModal from "./EditBookModal";
import AddBookModal from "./AddBookModal";
const BooksInfo = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const btnRef = useRef();
  var bookArray = [];
  const first = {
    Title: "",
    Author: "",
    Language: "",
    Price: "",
    Pages: "",
    Publisher: "",
    Rating: "",
    ImageUrl: "",
  };
  const [data, setData] = useState(first);
  const [books, setBooks] = useState([]);

  const getData = async () => {
    await getDocs(collection(db, "books")).then((res) => {
      res.forEach((doc) => {
        if (bookArray.find((book) => book.id === doc.id) === undefined) {
          const arr = { id: doc.id, ...doc.data() };
          bookArray.push(arr);
        }
      });
    });
    setBooks(bookArray);
  };

  useEffect(() => {
    getData();
    console.log(books);
  }, [count]);

  const handleAdd = () => {
    setIsAddOpen(true);
  };

  const handleClick = (e, book) => {
    setData(book);
    setIsOpen(true);
  };
  const handleDelete = (id) => {
    deleteDoc(doc(db, "books", id));
    setCount((prev) => prev + 1);
  };
  return (
    <>
      <BookModal
        book={data}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setCount={setCount}
      />
      <AddBookModal
        setIsAddOpen={setIsAddOpen}
        isAddOpen={isAddOpen}
        setCount={setCount}
      />
      <TableContainer p={2}>
        <Table variant={"simple"} overflowY={"scroll"}>
          <TableCaption>All Books</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Author</Th>
              <Th>Language</Th>
              <Th>Price</Th>
              <Th>Pages</Th>
              <Th>Publisher</Th>
              <Th>Rating</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {books.length === 0 && <Spinner size={"xl"} />}
            {books.length !== 0 &&
              books.map((book, index) => {
                return (
                  <Tr key={index}>
                    <Td>{book.Title}</Td>
                    <Td>{book.Author}</Td>
                    <Td>{book.Language}</Td>
                    <Td>{book.Price}</Td>
                    <Td>{book.Pages}</Td>
                    <Td>{book.Publisher}</Td>
                    <Td>{book.Rating}</Td>
                    <Td>
                      <Button
                        size='md'
                        ref={btnRef}
                        onClick={(e) => handleClick(e, book)}
                      >
                        Edit Book Info
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        size={"md"}
                        colorScheme='red'
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
        <Center>
          <Button
            variant={"solid"}
            colorScheme={"blue"}
            size={"lg"}
            onClick={handleAdd}
          >
            Add Book
          </Button>
        </Center>
      </TableContainer>
    </>
  );
};

export default BooksInfo;
