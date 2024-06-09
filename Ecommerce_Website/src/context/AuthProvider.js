import React, { createContext, useEffect, useState } from "react";

// import { useNotification } from '../hooks'
import { useNavigate } from "react-router-dom";
import { signInUser, getIsAuth } from "../api/user";
import { useNotification } from "../hooks/";

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const { updateNotification } = useNotification();

  const navigate = useNavigate();
  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { type, message, user, tokens } = await signInUser({
      email,
      password,
    });

    if (type === "Error") {
      return updateNotification("error", message);
      // return setAuthInfo({ ...authInfo, isPending: false, error });
    }
    navigate("/", { replace: true });

    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });

    sessionStorage.setItem("auth-token", tokens.accessToken);
  };
  const isAuth = async () => {
    // const token=localStorage.getItem('auth-token')
    const token = sessionStorage.getItem("auth-token");
    if (!token) {
      console.log(112);
      navigate(`/signIn`, { replace: true });
      return;
    }
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await getIsAuth(token);
    console.log(user);
    if (error) {
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }
    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    setAuthInfo({ ...defaultAuthInfo });
  };

  useEffect(() => {
    isAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ authInfo, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
