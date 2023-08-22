import { handleError } from "lib/helper";
import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingResendOtp, setLoadingResendOtp] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    toast.error(error);
  }, [error]);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const login = async (cellphone) => {
    setLoading(true);
    setError(null);
    const url = "/api/auth/login";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(cellphone),
    });
    const data = await response.json();

    // console.log(data);
    if (response.ok) {
      setLoading(false);
      toast.success(data.message);
    } else {
      setLoading(false);
      if (typeof data.message === "string") {
        setError(data.message);
        return;
      }
      setError(handleError(data.message));
    }
  };
  const checkOtp = async (otp) => {
    setLoading(true);
    setError(null);

    const url = "/api/auth/checkOtp";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ otp }),
    });
    const data = await response.json();

    if (response.ok) {
      setLoading(false);
      toast.success(data.message);
      setUser(data.user);
      router.push("/");
    } else {
      setLoading(false);
      if (typeof data.message === "string") {
        setError(data.message);
        return;
      }
      setError(handleError(data.message));
    }
  };
  const checkUserLoggedIn = async () => {
    const response = await fetch("/api/auth/me", {
      method: "POST",
    });
    const data = await response.json();

    if (response.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };
  const resendOtp = async () => {
    setLoadingResendOtp(true);
    setError(null);

    const url = "/api/auth/resendOtp";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      setLoadingResendOtp(false);
      toast.success(data.message);
    } else {
      setLoadingResendOtp(false);
      if (typeof data.message === "string") {
        setError(data.message);
        return;
      }
      setError(handleError(data.message));
    }
  };
  const logout = async () => {
    setLoading(true);
    setError(null);

    const url = "/api/auth/logout";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      setLoading(false);
      toast.success(data.message);
      setUser(null);
      router.push("/");
    } else {
      setLoading(false);
      if (typeof data.message === "string") {
        setError(data.message);
        return;
      }
      setError(handleError(data.message));
    }
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        checkOtp,
        resendOtp,
        logout,
        error,
        loading,
        user,
        loadingResendOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
