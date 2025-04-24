"use client";

import { createContext, useState, useContext } from "react";

interface LoginModalContextProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

const LoginModalContext = createContext<LoginModalContextProps | undefined>(
  undefined
);

export const LoginModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <LoginModalContext.Provider value={{ isLoginModalOpen, setIsLoginModalOpen }}>
      {children}
    </LoginModalContext.Provider>
  );
};

export const useLoginModal = () => {
  const context = useContext(LoginModalContext);
  if (!context) {
    throw new Error("useLoginModal must be used within a LoginModalProvider");
  }
  return context;
};
