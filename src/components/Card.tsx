import {
  Box,
  Image,
  Flex,
  Avatar,
  Stack,
  Heading,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import { Link as LinkRouter } from "@reach/router";

export const Card = ({ user }: any) => {
  return (
    <Box
      width="268px"
      bg="gray.200"
      boxShadow={"xl"}
      rounded={"md"}
      overflow={"hidden"}
      transition="0.2s"
      _hover={{ boxShadow: "2xl" }}
    >
      <Image
        h={"120px"}
        w={"full"}
        src={
          "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        }
        objectFit={"cover"}
      />
      <Flex justify={"center"} mt={-12}>
        <Avatar
          size={"xl"}
          src={
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
          }
          css={{
            border: "2px solid white",
          }}
        />
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={"center"} mb={5}>
          <Heading
            fontSize={"2xl"}
            fontWeight={500}
            fontFamily={"body"}
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {user.username}
          </Heading>
          <Text color={"gray.500"}>{user.email}</Text>
        </Stack>

        <Link as={LinkRouter} to={`/user/${user.id}`}>
          <Button
            w={"full"}
            mt={8}
            bg="gray.900"
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Details
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
