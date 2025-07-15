import { createContext, useContext, useState } from "react";
import api from "../utils/api.js";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const UserContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const saveToken = (token) => {
    localStorage.setItem("token", token);
    getUser();
  };

  const getToken = () => localStorage.getItem("token");

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/");
  };

  const getUser = () => {
    console.log("getting user");
    const token = getToken();
    if (!token) {
      return;
    }
    api
      .get("/api/v1/auth/user/" + token)
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const isAuthenticated = localStorage.getItem("token") ? true : false;

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, saveToken, logout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
