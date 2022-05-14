import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Center, Text } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { AnimatePresence } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";

import Navbar from "./Components/Navbar/Navbar";
import BooksPage from "./Components/BooksPage/BooksPage";
import BooksInfo from "./Components/AdminPage/BooksInfo";
import Book from "./Components/Book/Book";
import LoginPage from "./Components/LoginPage/LoginPage";
import ThankYouPage from "./Components/ThankYouPage/ThankYouPage";
import PurchasedBooks from "./Components/PurchasedBooks/PurchasedBooks";
import Landing from "./Components/Landing/Landing";
import SearchPage from "./Components/SearchPage/SearchPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setUser(data);
      if (data) {
        getDoc(doc(db, "users", data.uid)).then((data) => {
          setAdmin(data.data().role === "admin");
        });
      }
    });
  }, []);
  if (user === null) {
    return (
      <AnimatePresence exitBeforeEnter>
        <Router key={window.location.hash}>
          <Navbar admin={admin} user={user} />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<LoginPage />} />

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
      </AnimatePresence>
    );
  } else if (admin) {
    return (
      <AnimatePresence exitBeforeEnter>
        <Router key={window.location.hash}>
          <Navbar admin={admin} user={user} />
          <Routes>
            <Route path='/' element={<BooksInfo />} />
            <Route path='/login' element={<LoginPage />} />
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
      </AnimatePresence>
    );
  } else {
    return (
      <AnimatePresence exitBeforeEnter>
        <Router key={window.location.hash}>
          <Navbar admin={admin} user={user} />
          <Routes>
            <Route path='/' element={<BooksPage />} />
            <Route path='/book' element={<Book />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/thankyou' element={<ThankYouPage />} />
            <Route path='/purchasedBooks' element={<PurchasedBooks />} />
            <Route path='/search' element={<SearchPage />} />
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
      </AnimatePresence>
    );
  }
};

export default App;
