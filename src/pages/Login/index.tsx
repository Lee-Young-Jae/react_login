import { useQuery } from "@tanstack/react-query";
import { getCookie } from "../../utills/common";
import useForm from "../../hooks/useForm";
import { validateLoginForm } from "../../utills/validation/validateLoginForm";
import { UserData } from "../../types/userData";
import S from "./Style";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const fetchUserDataFromCookie: () => Promise<UserData> = async () => {
  const userData = getCookie("userData");
  if (!userData) {
    throw new Error("유저 데이터가 존재하지 않습니다.");
  }
  return JSON.parse(userData);
};

const Login = () => {
  const { data: userData } = useQuery<UserData, Error>({
    queryKey: ["userDataKey"],
    queryFn: fetchUserDataFromCookie,
  });

  const navigate = useNavigate();

  const { isLogin, setIsLogin } = useAuth();

  const { errors, getFieldProps, handleSubmit, touched, values } = useForm({
    initialState: {
      id: "",
      password: "",
    },
    validate: validateLoginForm,
    onSubmit: () => {
      if (values.id !== userData?.id) {
        alert("존재하지 않는 아이디입니다.");
        return;
      }
      if (values.password !== userData?.password) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      setIsLogin(true);
      // TODO: 마이페이지로 이동하도록 구현
      console.log("로그인 성공");
      navigate("/example");
    },
  });

  useEffect(() => {
    if (isLogin) {
      // TODO: 마이페이지로 이동하도록 구현
    }
  }, [isLogin]);

  return (
    <div>
      <S.Form onSubmit={handleSubmit}>
        <S.InputField>
          <label htmlFor="id">아이디</label>
          <input type="text" {...getFieldProps("id")} autoComplete="username" />
          {touched.id && errors.id && <div>{errors.id}</div>}
        </S.InputField>
        <S.InputField>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            {...getFieldProps("password")}
            autoComplete="current-password"
          />
          {touched.password && errors.password && <div>{errors.password}</div>}
        </S.InputField>
        <S.Buttons>
          <S.Link to="/signup">회원가입</S.Link>
          <button type="submit">로그인</button>
        </S.Buttons>
      </S.Form>
    </div>
  );
};

export default Login;
