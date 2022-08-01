import {
  SimpleGrid,
  Box,
  Stack,
  Text,
  Center,
  Image,
  Flex,
} from "@chakra-ui/react";
import background from "./assets/background.jpg";
import { ImBooks } from "react-icons/im";
import { GrSecure } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";

const Landing = () => {
  return (
    <>
      <Stack>
        <Box
          position={"relative"}
          height={"700px"}
          display='flex'
          alignItems='center'
          justifyContent={"center"}
        >
          <Box
            backgroundImage={`url(${background})`}
            backgroundSize='cover'
            backgroundPosition='center'
            backgroundRepeat='no-repeat'
            width='100%'
            height='100%'
            filter={`blur(3px)`}
          ></Box>
          <Flex
            zIndex={100}
            position='absolute'
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%,-50%)"}
            width='100%'
            justifyContent={"center"}
          >
            <Text fontSize='6xl' as='b' color={"white"}>
              Welcome to
              <Text fontSize={"6xl"} as='b' color={"blue"} ml='3'>
                BookStore
              </Text>
            </Text>
          </Flex>
        </Box>
        <Box>
          <Center>
            <Text fontSize={"5xl"} as='b'>
              Features
            </Text>
          </Center>
          <SimpleGrid
            columns={[1, 2, 3]}
            spacing={10}
            justifyContent='space-between'
            px={10}
          >
            <Box borderRadius={"20px"} p={4} mx='auto'>
              <Flex mx={"auto"} justifyContent='center'>
                <GiBookshelf size={200} />
              </Flex>
              <Text fontSize='xl' textAlign={"center"}>
                A curated Collection of Books
              </Text>
            </Box>
            <Box borderRadius={"20px"} p={4} mx='auto'>
              <Flex mx={"auto"} justifyContent='center'>
                <GrSecure size={190} />
              </Flex>
              <Text fontSize='xl' textAlign={"center"}>
                Secure Authentication System
              </Text>
            </Box>
            <Box borderRadius={"20px"} p={4} mx='auto'>
              <Flex mx={"auto"} justifyContent='center'>
                <CgProfile size={200} />
              </Flex>
              <Text fontSize='xl' textAlign={"center"}>
                Personalized
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Stack>
    </>
  );
};

export default Landing;
