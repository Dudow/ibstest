import {
  Text,
  Button,
  Flex,
  Avatar,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverHeader,
  useDisclosure,
} from "@chakra-ui/react";
import { useApi } from "../hooks/useApi";
import { navigate } from "@reach/router";
import { useEffect, useState } from "react";

export const UserDetails = ({ user }: any) => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const { deleteUser, getProfession } = useApi();

  const [profession, setProfession] = useState("");

  const handleDeleteUser = async (user_id: string) => {
    await deleteUser(user_id);
    navigate(`/`);
  };

  useEffect(() => {
    if (user.profession_id)
      getProfession(user.profession_id).then((professionData: any) => {
        setProfession(professionData.title);
      });
  }, [user]);

  return (
    <Flex
      p="4"
      boxShadow="lg"
      borderRadius={4}
      gap={4}
      justifyContent="space-between"
      bg="gray.800"
      width="100%"
      maxW="720px"
    >
      <Flex gap={4}>
        <Avatar
          size={"xl"}
          src={
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
          }
          css={{
            border: "2px solid white",
          }}
        />
        <Flex flexDir="column">
          <Text fontWeight="semibold" fontSize="2xl" color="gray.200">
            {user.username}
          </Text>

          <Text
            fontSize="sm"
            textAlign={"left"}
            fontWeight="bold"
            color="gray.200"
          >
            E-mail: {user.email}
          </Text>
          <Text
            fontSize="sm"
            textAlign={"left"}
            fontWeight="bold"
            color="gray.200"
          >
            Phone: {user.phone}
          </Text>
          <Text
            fontSize="sm"
            textAlign={"left"}
            fontWeight="bold"
            color="gray.200"
          >
            Profession: {profession}
          </Text>
        </Flex>
      </Flex>
      <Flex alignItems="flex-end" justifySelf="flex-end">
        <Popover placement="top" isOpen={isOpen} onOpen={onOpen}>
          <PopoverTrigger>
            <Button colorScheme="red" minW="200px" color="gray.900">
              Delete
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                Are you sure that you want to delete?
              </PopoverHeader>
              <PopoverBody>
                <Flex gap={4} width="100%" justify="flex-end">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Flex>
    </Flex>
  );
};
