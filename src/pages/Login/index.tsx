import { useQuery } from "@tanstack/react-query";
import { getCookie } from "../../utills/common";
import useForm from "../../hooks/useForm";
import { validateLoginForm } from "../../utills/validation/validateLoginForm";
import { UserData } from "../../types/userData";
import { Link } from "react-router-dom";

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
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">아이디</label>
          <input type="text" {...getFieldProps("id")} autoComplete="username" />
          {touched.id && errors.id && <div>{errors.id}</div>}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            {...getFieldProps("password")}
            autoComplete="current-password"
          />
          {touched.password && errors.password && <div>{errors.password}</div>}
        </div>
        <Link to="/signup">회원가입</Link>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
