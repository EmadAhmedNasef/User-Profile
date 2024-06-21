import { createContext, useEffect, useState } from "react";

export const userContext = createContext(null);

export default function UserContextProvider(props) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <userContext.Provider value={{ user, token, setToken, setUser }}>
      {props.children}
    </userContext.Provider>
  );
}
