import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Input, Button, Stack, useToast } from "@chakra-ui/react";
import { app } from "../../firebase";
import {
  signInWithEmailAndPassword,
  getAuth,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import validator from "validator";

const SignIn = () => {
  const auth = getAuth(app);
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      console.log(data);
      setUser(data);
    });
    if (user !== null) {
      console.log(user);
      toast({
        title: "Sign In Successful",
        description: "You have Successfully signed In to your account",
        status: "success",
        duration: 1000,
        isClosable: true,
        variant: "solid",
        position: "top",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [auth, count]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.isEmail(email) && !validator.isEmpty(password)) {
      setPersistence(auth, browserSessionPersistence)
        .then(async () => {
          return await signInWithEmailAndPassword(auth, email, password).then(
            () => {
              setCount((prev) => prev + 1);
            }
          );
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError("Enter valid inputs");
    }
  };
  return (
    <Container maxW={"container.md"} p={15}>
      <Stack spacing={5}>
        <Input
          type='email'
          value={email}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type='password'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} colorScheme='blue'>
          Sign In
        </Button>
        {error !== "" && <p>{error}</p>}
      </Stack>
    </Container>
  );
};

export default SignIn;
