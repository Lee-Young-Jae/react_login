import { useState, useContext, createContext, useEffect } from "react";
import { UserData } from "../types/userData";
import { getCookie, setCookie } from "../utills/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../App";
import { useNavigate } from "react-router-dom";
import CustomError from "../types/customError";

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

let errorCount = 0;
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const fetchUserDataFromCookie: () => Promise<UserData> = async () => {
    try {
      const userData = getCookie("userData");
      if (!userData) {
        const newError = new Error("사용자 정보가 없어요.") as CustomError;
        newError.info = {
          code: 403,
          message: "사용자 정보가 없어요.",
          status: 403,
        };
        throw newError;
      }

      const parsedUserData = JSON.parse(userData);

      return parsedUserData;
    } catch (error) {
      if (error instanceof CustomError) {
        navigate("/error", {
          state: { error: error.info },
        });
      } else {
        const newError = new CustomError("알 수 없는 오류입니다.");
        newError.info = {
          code: 500,
          message: "알 수 없는 오류입니다.",
          status: 500,
        };

        navigate("/error", {
          state: { error: newError.info },
        });
      }
    }
  };

  const updateUser = async (newUserData: UserData) => {
    try {
      setCookie("userData", JSON.stringify(newUserData), 30);

      if (newUserData.name === "test") {
        const newError = new CustomError("이름은 test로 등록할 수 없어요.");
        newError.info = {
          code: 403,
          message: "이름은 test로 등록할 수 없어요.",
          status: 403,
        };

        throw newError;
      }

      if (errorCount < 3) {
        errorCount++;
        const newError = new CustomError("서버 오류입니다.");
        newError.info = {
          code: 500,
          message: "서버 오류입니다.",
          status: 500,
        };
        throw newError;
      }
    } catch (error) {
      if (error instanceof CustomError) {
        navigate("/error", {
          state: { error: error.info },
        });
      } else {
        const newError = new CustomError("알 수 없는 오류입니다.");
        newError.info = {
          code: 500,
          message: "알 수 없는 오류입니다.",
          status: 500,
        };

        navigate("/error", {
          state: { error: newError.info },
        });
      }
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
  } = useQuery<UserData, CustomError>({
    queryKey: ["userDataKey"],
    queryFn: fetchUserDataFromCookie,
  });

  const { mutate, isSuccess } = useMutation<UserData, CustomError, UserData>({
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
