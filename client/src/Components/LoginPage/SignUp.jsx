import { Button, Center, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../Store/reducers/user";
import { useNavigate } from "react-router-dom";
import validator from "validator";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.user.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const handleSignUp = () => {
    if (
      validator.isEmail(email) &&
      !validator.isEmpty(name) &&
      !validator.isEmpty(password)
    ) {
      dispatch(signUp({ email, password, name }))
        .then(() => {
          if (errors === "") {
            navigate("/books");
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError("Please fill all the fields with proper Values");
    }
  };
  return (
    <>
      <Stack spacing={4}>
        <Input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Button onClick={handleSignUp} colorScheme='blue'>
          Sign Up
        </Button>
        {error !== "" && (
          <Center>
            <p>{error}</p>
          </Center>
        )}
      </Stack>
    </>
  );
};

export default SignUp;
