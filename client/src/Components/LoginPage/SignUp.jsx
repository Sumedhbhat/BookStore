import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, addDoc, updateDoc, setDoc } from "firebase/firestore";
import { Stack, Input, Button, Center, useToast } from "@chakra-ui/react";
import validator from "validator";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    if (validator.isEmail(email)) {
      if (password.length > 6) {
        if (name.length > 2) {
          await createUserWithEmailAndPassword(auth, email, password)
            .then(async () => {
              await updateProfile(auth.currentUser, { displayName: name }).then(
                async () => {
                  await setDoc(doc(db, "users", auth.currentUser.uid), {
                    name: name,
                    email: email,
                    purchasedBooks: [],
                    role: "user",
                  });
                  toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                  setEmail("");
                  setPassword("");
                  setName("");
                  navigate("/");
                }
              );
            })
            .catch((err) => {
              setError(err.message);
            });
        }
      }
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
