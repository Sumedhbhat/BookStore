import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
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
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "../Store/reducers/books";
const BooksInfo = () => {
  const dispatch = useDispatch();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const count = useSelector((state) => state.books.count);
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
  const books = useSelector((state) => state.books.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [count]);

  const handleAdd = () => {
    setIsAddOpen(true);
  };

  const handleClick = (e, book) => {
    setData(book);
    setIsOpen(true);
  };
  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };
  return (
    <>
      <BookModal book={data} setIsOpen={setIsOpen} isOpen={isOpen} />
      <AddBookModal setIsAddOpen={setIsAddOpen} isAddOpen={isAddOpen} />
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
                      <Button size='md' onClick={(e) => handleClick(e, book)}>
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
      </TableContainer>
      <Center mt={4}>
        <Button
          variant={"solid"}
          colorScheme={"blue"}
          size={"lg"}
          onClick={handleAdd}
        >
          Add Book
        </Button>
      </Center>
    </>
  );
};

export default BooksInfo;
