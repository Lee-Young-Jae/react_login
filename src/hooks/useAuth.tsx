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
  const [isLogin, setIsLogin] = useState(false);

  const queryClient = useQueryClient();

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

  const updateUser = async (newUserData: UserData) => {
    setCookie("userData", JSON.stringify(newUserData), 30);
    return newUserData;
  };

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

const fetchUserDataFromCookie: () => Promise<UserData> = async () => {
  try {
    const userData = getCookie("userData");
    if (!userData) {
      throw new Error("유저 데이터가 존재하지 않습니다.");
    }
    return JSON.parse(userData);
  } catch (error) {
    throw new Error("사용자 데이터를 가져오는 중에 오류가 발생했습니다.");
  }
};

export default AuthProvider;
