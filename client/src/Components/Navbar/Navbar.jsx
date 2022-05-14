import {
  Container,
  Image,
  Box,
  Flex,
  Spacer,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LogoTransparent from "./assets/logoTransparent.png";

const Navbar = ({ user, admin }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (search === "") {
      navigate("/");
    } else {
      navigate("/search?search=" + search);
    }
  }, [search]);

  return (
    <Flex sx={{ py: 1, px: 2, height: "60px" }}>
      <Box sx={{ height: "100%" }} onClick={() => navigate("/")}>
        <Image src={LogoTransparent} alt='' height={"100%"} />
      </Box>
      <Spacer />
      {user !== null && !admin && (
        <>
          <Input
            type={"text"}
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            width={"300px"}
            borderRadius={"10px"}
            mr={2}
          />
          <Button
            colorScheme={"blue"}
            onClick={() => navigate("/purchasedBooks")}
            mr={2}
          >
            PurchasedBooks
          </Button>
        </>
      )}
      {user !== null ? (
        <Button colorScheme={"red"} onClick={handleClick}>
          Sign Out
        </Button>
      ) : (
        <Button colorScheme={"blue"} onClick={() => navigate("/login")}>
          Sign In
        </Button>
      )}
    </Flex>
  );
};

export default Navbar;
