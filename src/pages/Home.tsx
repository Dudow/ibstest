import { useEffect, useState } from "react";
import { Text, Container, Flex } from "@chakra-ui/react";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { useApi } from "../hooks/useApi";

export default function Home() {
  const { fetchUsers, users } = useApi();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container p={20} minW="100vw" minHeight="100vh" bg="gray.700">
      <Header />
      <Text fontSize="2xl" fontWeight="bold" color="gray.300">
        Users
      </Text>
      <Flex bg="gray.600" borderRadius={4} p={4} gap={6} flexDir="column">
        <Flex gap={6} wrap="wrap">
          {users.length > 0 ? (
            users.map((user) => <Card key={user.id} user={user} />)
          ) : (
            <Text fontSize="2xl" fontWeight="bold" color="gray.300">
              There are no users
            </Text>
          )}
        </Flex>
      </Flex>
    </Container>
  );
}
