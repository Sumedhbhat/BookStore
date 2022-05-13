import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Center, Text } from "@chakra-ui/react";
import Navbar from "./Components/Navbar/Navbar";
import BooksPage from "./Components/BooksPage/BooksPage";
import BooksInfo from "./Components/AdminPage/BooksInfo";
import Book from "./Components/Book/Book";
import LoginPage from "./Components/LoginPage/LoginPage";
import ThankYouPage from "./Components/ThankYouPage/ThankYouPage";
import PurchasedBooks from "./Components/PurchasedBooks/PurchasedBooks";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/books' element={<BooksPage />} />
        <Route path='/admin/books' element={<BooksInfo />} />
        <Route path='/book' element={<Book />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/thankyou' element={<ThankYouPage />} />
        <Route path='/purchasedBooks' element={<PurchasedBooks />} />
        <Route
          path='*'
          element={
            <Center>
              <Text fontSize={"5xl"}>Not Found</Text>
            </Center>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
