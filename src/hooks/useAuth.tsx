import { useState, useContext, createContext, useEffect } from "react";
import { UserData } from "../types/userData";
import { getCookie, setCookie } from "../utills/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type AuthContextType = {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  isError: boolean;
  isLoading: boolean;
  userData?: UserData;
  mutateUserData: (newUserData: UserData) => void;
  mutateSuccess: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  setIsLogin: () => {},
  isError: false,
  isLoading: false,
  userData: undefined,
  mutateSuccess: false,
  mutateUserData: () => {},
});

AuthContext.displayName = "AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorCount, setErrorCount] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const queryClient = useQueryClient();

  const fetchUserDataFromCookie: () => Promise<UserData> = async () => {
    try {
      const userData = getCookie("userData");
      if (!userData) {
        return {};
      }
      const parsedUserData = JSON.parse(userData);
      return parsedUserData;
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (newUserData: UserData) => {
    try {
      setCookie("userData", JSON.stringify(newUserData), 30);

      setErrorCount((prev) => prev + 1);
      if (errorCount >= 3) {
        setErrorCount(0);
        throw new Error("통신에러, 너무 많은 요청을 보냈어요.");
      }
    } catch (error) {
      throw error;
    }
    return newUserData;
  };

  useEffect(() => {
    const userDataString = getCookie("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      queryClient.setQueryData(["userDataKey"], userData);
    }
  }, [queryClient]);

  const {
    data: userData,
    isError,
    isLoading,
  } = useQuery<UserData, Error>({
    queryKey: ["userDataKey"],
    queryFn: fetchUserDataFromCookie,
  });

  const { mutate, isSuccess } = useMutation<UserData, Error, UserData>({
    mutationFn: updateUser,
    onSuccess: (newUserData: UserData) => {
      queryClient.setQueryData(["userDataKey"], newUserData);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        isError,
        isLoading,
        userData,
        mutateUserData: mutate,
        mutateSuccess: isSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
