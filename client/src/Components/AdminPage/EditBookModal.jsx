import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  CircularProgress,
} from "@chakra-ui/react";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../Store/reducers/books";

const BookModal = ({ setIsOpen, isOpen, book }) => {
  const dispatch = useDispatch();
  const [progresspercent, setProgresspercent] = useState(0);
  const onClose = () => {
    setIsOpen(false);
  };
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    if (e.target.value !== "") {
      setValues((value) => ({ ...value, [e.target.name]: e.target.value }));
    }

    if (e.target.value === "") {
      var newValues = { ...values };
      delete newValues[name];
      setValues(newValues);
    }
  };

  const handleSubmit = async (e) => {
    const id = book.id;
    dispatch(updateBook({ id, values })).then(() => {
      setIsOpen(false);
    });
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
          setValues((value) => ({ ...value, ImageUrl: url }));
          console.log(url);
        });
      }
    );
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Book Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={2}>
              <InputGroup>
                <InputLeftAddon children='Title' />
                <Input
                  type={"string"}
                  placeholder={book.Title}
                  name='Title'
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children='Author' />
                <Input
                  type={"string"}
                  placeholder={book.Author}
                  name='Author'
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children='Language' />
                <Input
                  type={"string"}
                  placeholder={book.Language}
                  name='Language'
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children='Price' />
                <Input
                  type={"string"}
                  placeholder={book.Price}
                  name='Price'
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children='Pages' />
                <Input
                  type={"string"}
                  placeholder={book.Pages}
                  name='Pages'
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children='Publisher' />
                <Input
                  type={"string"}
                  placeholder={book.Publisher}
                  name='Publisher'
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children='Rating' />
                <Input
                  type={"string"}
                  placeholder={book.Rating}
                  name='Rating'
                  onChange={handleChange}
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
              Update
            </Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookModal;
