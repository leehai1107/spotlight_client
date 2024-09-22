import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    let role_id = null;
    const token = localStorage.getItem("token");
    if (token) {
      role_id = JSON.parse(atob(token.split(".")[1])).role_id;
    }
    if (role_id) {
      setAuth({ role_id });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
