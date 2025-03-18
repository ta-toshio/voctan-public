"use client";

import {createContext, useContext, useState} from "react";

import {UserType} from "@/contexts/types/user";


type UserData = {
  uuid: string;
  type: UserType;
  isLoggedIn: boolean;
}

type UserContextType = {
  data: UserData;
  setUserContext: (data: UserData) => void;
}

const defaultUserContext: UserContextType["data"] = {
  uuid: "",
  type: UserType.GUEST,
  isLoggedIn: false,
}

const UserContext = createContext<UserContextType>(defaultUserContext["data"]);

export const UserProvider = function ({children, ...props}) {
  const [data, setUserContext] = useState(props || defaultUserContext["data"]);

  return (
    <UserContext.Provider value={{ data, setUserContext }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);

