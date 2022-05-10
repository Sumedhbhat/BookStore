import { Button, Center, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../Store/reducers/user";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.user.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSignIn = () => {
    dispatch(signIn({ email, password }))
      .then(() => {
        // navigate("/books");
      })
      .catch((err) => {
        setError(err);
      });
  };
  return (
    <>
      <Stack spacing={4}>
        <Input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignIn} colorScheme='blue'>
          Sign In
        </Button>
        {(error !== "" || errorMessage !== "") && (
          <Center>
            <p>{error}</p>
            <p>{errorMessage}</p>
          </Center>
        )}
      </Stack>
    </>
  );
};

export default SignIn;
