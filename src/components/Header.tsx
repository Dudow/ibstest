import {
  Text,
  Button,
  Flex,
  Image,
  useDisclosure,
  DrawerContent,
  Drawer,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { useApi } from "../hooks/useApi";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createUser, getProfessionOptions, fetchUsers } = useApi();

  const [professionOptions, setProfessionOptions] = useState<any[]>([]);

  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const professionInput = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    getProfessionOptions().then((fetchedProfessionOptions: any) =>
      setProfessionOptions(fetchedProfessionOptions)
    );
  }, []);

  const handleSubmit = async () => {
    const data = {
      username: nameInput.current?.value,
      email: emailInput.current?.value,
      phone: phoneInput.current?.value,
      profession_id: professionInput.current?.value,
    };

    await createUser(data);
    onClose();
    fetchUsers();
  };

  return (
    <Flex
      mb={10}
      justifyContent="space-between"
      bg="gray.600"
      p={4}
      borderRadius={4}
      alignItems="center"
    >
      <Flex alignItems="center" gap={4}>
        <Image
          h={"40px"}
          w={"40px"}
          borderRadius="50%"
          src={logo}
          objectFit={"cover"}
        />
        <Text fontSize="2xl" fontWeight="bold" color="white">
          IBSOW
        </Text>
      </Flex>
      <Button
        bg="gray.800"
        color="gray.200"
        colorScheme="blackAlpha"
        p={5}
        onClick={onOpen}
      >
        Add New User
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new user</DrawerHeader>

          <DrawerBody>
            <form
              id="my-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input name="name" placeholder="Name" ref={nameInput} />

              <FormLabel htmlFor="email" mt={4}>
                E-mail
              </FormLabel>
              <Input name="email" placeholder="E-mail" ref={emailInput} />

              <FormLabel htmlFor="phone" mt={4}>
                Phone
              </FormLabel>
              <Input name="phone" placeholder="Phone" ref={phoneInput} />

              <FormLabel htmlFor="profession" mt={4}>
                Profession
              </FormLabel>
              <Select
                name="profession"
                placeholder="Select option"
                mt={4}
                ref={professionInput}
              >
                {professionOptions &&
                  professionOptions.map((professionOption) => (
                    <option
                      value={professionOption.id}
                      key={professionOption.id}
                    >
                      {professionOption.title}
                    </option>
                  ))}
              </Select>
            </form>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" form="my-form">
              Create
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
