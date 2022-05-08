import { Container, Image, Box } from "@chakra-ui/react";
import LogoTransparent from "./assets/logoTransparent.png";
const Navbar = () => {
  return (
    <Box sx={{ py: 1, px: 2, height: "60px" }}>
      <Box sx={{ height: "100%" }}>
        <Image src={LogoTransparent} alt='' height={"100%"} />
      </Box>
    </Box>
  );
};

export default Navbar;
