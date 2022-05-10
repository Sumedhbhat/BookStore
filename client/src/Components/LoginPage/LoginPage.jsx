import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const LoginPage = () => {
  return (
    <>
      <Container maxW={"container.md"} mx='auto' height={"100vh"} my='auto'>
        <Tabs isFitted>
          <TabList>
            <Tab>Sign Up</Tab>
            <Tab>Sign In</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SignUp />
            </TabPanel>
            <TabPanel>
              <SignIn />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export default LoginPage;
