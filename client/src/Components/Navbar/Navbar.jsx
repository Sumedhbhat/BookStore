import { Container, Image, Box, Flex, Spacer, Button } from "@chakra-ui/react";
import LogoTransparent from "./assets/logoTransparent.png";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <Flex sx={{ py: 1, px: 2, height: "60px" }}>
      <Box sx={{ height: "100%" }}>
        <Image src={LogoTransparent} alt='' height={"100%"} />
      </Box>
      <Spacer />
      <Button colorScheme={"blue"} onClick={() => navigate("/purchasedBooks")}>
        PurchasedBooks
      </Button>
      <Button colorScheme={"red"} onClick={handleClick}>
        Sign Out
      </Button>
    </Flex>
  );
};

export default Navbar;
