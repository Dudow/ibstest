import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import User from "./pages/User";
import { Router, RouteComponentProps } from "@reach/router";
import { UserProps } from "./types";
import { ApiProvider } from "./hooks/useApi";

const HomePage = (props: RouteComponentProps) => <Home />;
const UserPage = (props: UserProps) => <User id={props} />;

export const App = () => (
  <ApiProvider>
    <ChakraProvider>
      <Router>
        <HomePage path="/" />
        <UserPage path="/user/:id" />
      </Router>
    </ChakraProvider>
  </ApiProvider>
);
