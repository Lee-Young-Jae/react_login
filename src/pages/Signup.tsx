import { useNavigate } from "react-router-dom";
import { setCookie } from "../utills/common";
import useForm from "../hooks/useForm";

const SignupPage = () => {
  const navigate = useNavigate();

  const { errors, handleBlur, handleChange, handleSubmit, touched, values } =
    useForm({
      initialState: {
        id: "",
        password: "",
        name: "",
        image: "",
      },
      validate: (values) => {
        const errors: { [key: string]: string } = {};
        if (!values.id) {
          errors.id = "아이디를 입력해주세요.";
        }
        const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegExp.test(values.id)) {
          errors.id = "이메일 형식으로 입력해주세요.";
        }
        if (!values.password) {
          errors.password = "비밀번호를 입력해주세요.";
        }
        const passwordRegExp =
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
        if (!passwordRegExp.test(values.password)) {
          errors.password =
            "비밀번호는 숫자, 영문-소, 영문-대, 특수문자를 포함하여 8~16자리로 입력해주세요.";
        }
        const numberRegExp = /(\d)\1\1/;
        if (numberRegExp.test(values.password)) {
          errors.password = "연속된 숫자 3개 이상 입력할 수 없습니다.";
        }

        if (!values.name) {
          errors.name = "이름을 입력해주세요.";
        }
        if (values.name.length > 5) {
          errors.name = "이름은 5글자 이하로 입력해주세요.";
        }

        return errors;
      },
      onSubmit: (values) => {
        // TODO: 유효성 검증 로직을 작성한다.

        setCookie("userData", JSON.stringify(values), 30);
        navigate("/");
      },
    });

  return (
    <div>
      <h2>회원 가입 페이지</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            id="image"
            name="image"
            value={values.image}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="image">이미지 업로드</label>
        </div>
        <div>
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            name="id"
            value={values.id}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.id && errors.id && <div>{errors.id}</div>}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && <div>{errors.password}</div>}
        </div>
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name && <div>{errors.name}</div>}
        </div>

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignupPage;
