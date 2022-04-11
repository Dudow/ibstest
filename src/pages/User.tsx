import { Container, Text, Flex, Icon, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UserDetails } from "../components/UserDetails";
import { IUser } from "../types";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link as LinkRouter } from "@reach/router";
import { api } from "../api";

export default function User({ id }: any) {
  const [user, setUser] = useState<IUser>({} as any);

  const fetchUser = async () => {
    const fetchedUser = api.get(`/person/${id.id}`).then((res) => {
      return res.data;
    });

    const resolvedFetchedUser = await Promise.resolve(fetchedUser);

    setUser(resolvedFetchedUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Container p={20} minW="100vw" minHeight="100vh" bg="gray.700">
      <Flex alignItems="center" mb={10} gap={4}>
        <Link as={LinkRouter} to={`/`} display="flex">
          <Icon
            as={MdKeyboardArrowLeft}
            bg="gray.800"
            color="gray.200"
            w={8}
            h={8}
            borderRadius={4}
          />
        </Link>
        <Text fontSize="2xl" fontWeight="bold" color="gray.300">
          {user?.username}'s details
        </Text>
      </Flex>
      <UserDetails user={user} />
    </Container>
  );
}
