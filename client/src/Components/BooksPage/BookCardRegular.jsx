import { Box, Image, Text, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const BookCardRegular = ({ book }) => {
  const navigate = useNavigate();
  const { ImageUrl, Title, Author, Language, Price, Pages, Publisher, Rating } =
    book;
  return (
    <Box
      boxShadow={"10px 10px 10px #ccc"}
      maxW={"sm"}
      height={"lg"}
      borderRadius={"20px"}
      p={2}
      onClick={() => navigate(`/book?bookId=${book.id}`)}
    >
      <Stack>
        <Image
          src={ImageUrl}
          borderRadius={"20px 20px 0px 0px"}
          height='330px'
        />
        <Box>
          <Stack spacing={2}>
            <Text fontSize='xl' as='b' isTruncated>
              {Title}
            </Text>
            <Text fontSize='lg'>{Author}</Text>
            <Text fontSize='lg'>{Price}</Text>
            <Text fontSize='lg'>{Rating}</Text>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default BookCardRegular;
