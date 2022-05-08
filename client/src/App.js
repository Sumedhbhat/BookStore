import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import BooksPage from "./Components/BooksPage/BooksPage";
import BooksInfo from "./Components/AdminPage/BooksInfo";
import { Text } from "@chakra-ui/react";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/books' element={<BooksPage />} />
        <Route path='/admin/books' element={<BooksInfo />} />
        <Route path='*' element={<Text fontSize={"6xl"}>Not Found</Text>} />
      </Routes>
    </Router>
  );
};

export default App;
