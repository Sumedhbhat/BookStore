import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Input,
  InputLeftAddon,
  InputGroup,
  Button,
  Textarea,
  Text,
  CircularProgress,
  CircularProgressLabel,
  InputRightAddon,
} from "@chakra-ui/react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import validator from "validator";

const AddBookModal = ({ isAddOpen, setIsAddOpen, setCount }) => {
  const [error, setError] = useState({});
  const [imageUrl, setimageUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const onClose = () => {
    setIsAddOpen(false);
  };

  const handleChange = (event) => {
    if (event.target.name === "ImageUrl") {
      return;
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }
    console.log(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({});
    if (validator.isEmpty(values.Title)) {
      setError((prev) => ({ ...prev, title: "Title is required" }));
    }
    if (validator.isEmpty(values.Author)) {
      setError((prev) => ({ ...prev, author: "Author is required" }));
    }
    if (validator.isEmpty(values.Language)) {
      setError((prev) => ({ ...prev, language: "Language is required" }));
    }
    if (validator.isEmpty(values.Price)) {
      setError((prev) => ({ ...prev, price: "Price is required" }));
    }
    if (validator.isEmpty(values.Pages)) {
      setError((prev) => ({ ...prev, pages: "Pages is required" }));
    }
    if (validator.isEmpty(values.Publisher)) {
      setError((prev) => ({ ...prev, publisher: "Publisher is required" }));
    }
    if (validator.isEmpty(values.Description)) {
      setError((prev) => ({ ...prev, description: "Description is required" }));
    }
    if (validator.isEmpty(values.ImageUrl)) {
      setError((prev) => ({ ...prev, image: "Image is required" }));
    }
    console.log(error);
    if (Object.keys(error).length === 0) {
      await addDoc(collection(db, "books"), values).then(() => {
        setCount((prev) => prev + 1);
      });
      setIsAddOpen(false);
    }
  };

  const handleFile = async (e) => {
    const file = e.target?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setValues({ ...values, ImageUrl: url });
          console.log(url);
        });
      }
    );
  };

  const [values, setValues] = useState({});

  return (
    <Modal size={"lg"} isOpen={isAddOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={2}>
            <InputGroup>
              <InputLeftAddon children='Title' />
              <Input type={"string"} name='Title' onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children='Author' />
              <Input type={"string"} name='Author' onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children='Language' />
              <Input type={"string"} name='Language' onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children='Price' />
              <Input type={"string"} name='Price' onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children='Pages' />
              <Input type={"string"} name='Pages' onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children='Publisher' />
              <Input type={"string"} name='Publisher' onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children='Rating' />
              <Input type={"string"} name='Rating' onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <Textarea
                type={"string"}
                name='Description'
                onChange={handleChange}
                noOfLines={4}
                placeholder='Description'
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children='ImageUrl' />
              <Input type={"file"} name='ImageUrl' onChange={handleFile} />
              <InputRightAddon
                children={
                  <CircularProgress value={progresspercent} size={"25px"} />
                }
              />
            </InputGroup>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' onClick={handleSubmit}>
            Add Book
          </Button>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBookModal;
