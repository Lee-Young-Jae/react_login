import { useState, useContext, createContext } from "react";

type AuthContextType = {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  setIsLogin: () => {},
});

AuthContext.displayName = "AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
