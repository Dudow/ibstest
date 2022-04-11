import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../api";
import { IUser } from "../types";

interface ApiProviderProps {
  children: ReactNode;
}

interface ApiContextData {
  users: IUser[];

  deleteUser: (user_id: string) => void;
  createUser: (data: any) => void;
  fetchUsers: () => any;
  getProfessionOptions: () => any;
  getProfession: (id: string) => any;
}

export const ApiContext = createContext<ApiContextData>({} as ApiContextData);

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const [users, setUsers] = useState<IUser[]>([] as any);

  const deleteUser = async (user_id: string) => {
    await api.delete(`/person/${user_id}`);
  };

  const createUser = async (data: any) => {
    await api.post(`/person/`, data);
  };

  const fetchUsers = async () => {
    const fetchedUsers = api.get("/person").then((res) => {
      return res.data;
    });

    const resolvedFetchedUsers = await Promise.resolve(fetchedUsers);

    setUsers(resolvedFetchedUsers);
  };

  const getProfessionOptions = async () => {
    const fetchedProfessionOptions = api.get("/profession").then((res) => {
      return res.data;
    });

    const resolvedFetchedProfessionOptions = await Promise.resolve(
      fetchedProfessionOptions
    );

    return resolvedFetchedProfessionOptions;
  };

  const getProfession = async (id: string) => {
    const fetchedProfessional = api.get("/profession/" + id).then((res) => {
      return res.data;
    });

    const resolvedFetchedUsers = await Promise.resolve(fetchedProfessional);

    return resolvedFetchedUsers;
  };

  return (
    <ApiContext.Provider
      value={{
        createUser,
        deleteUser,
        fetchUsers,
        getProfessionOptions,
        getProfession,
        users,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);

  return context;
};
