import useForm from "../../hooks/useForm";
import { validateLoginForm } from "../../utills/validation/validateLoginForm";
import S from "./Style";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin, userData } = useAuth();
  const [failCount, setFailCount] = useState(0);
  const { errors, getFieldProps, handleSubmit, touched, values } = useForm({
    initialState: {
      id: "",
      password: "",
    },
    validate: validateLoginForm,
    onSubmit: () => {
      if (values.id !== userData?.id) {
        alert("존재하지 않는 아이디입니다.");
        setFailCount((prev) => prev + 1);

        return;
      }
      if (values.password !== userData?.password) {
        alert("비밀번호가 일치하지 않습니다.");
        setFailCount((prev) => prev + 1);
        return;
      }

      setIsLogin(true);
      navigate("/mypage");
    },
  });

  useEffect(() => {
    if (failCount >= 3) {
      throw new Error("너무 많은 시도로 인해 로그인이 불가능합니다.");
    }
  }, [failCount]);

  useEffect(() => {
    if (isLogin) {
      alert("이미 로그인 중입니다. 마이페이지로 이동합니다.");
      navigate("/mypage");
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
