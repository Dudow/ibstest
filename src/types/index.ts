import { RouteComponentProps } from "@reach/router";

export interface IUser {
  id: string;
  username: string;
  phone: string;
  email: string;
  profession_id: string;
}

export interface UserProps extends RouteComponentProps {
  data?: any;
}
