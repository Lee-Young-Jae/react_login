import { useNavigate } from "react-router-dom";
import { setCookie } from "../../utills/common";
import useForm from "../../hooks/useForm";
import S from "./Style";
import { useState } from "react";

const SignupPage = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState<string | null>(null);

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
    getFieldProps,
  } = useForm({
    initialState: {
      id: "",
      password: "",
      passwordCheck: "",
      name: "",
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

      if (!values.passwordCheck) {
        errors.passwordCheck = "비밀번호를 다시 입력해주세요.";
      }

      if (values.password !== values.passwordCheck) {
        errors.passwordCheck = "비밀번호가 일치하지 않습니다.";
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
      let imageName = "";
      if (image) {
        imageName = image.split(",")[1];
      }
      const newUser = {
        id: values.id,
        password: values.password,
        name: values.name,
        image: imageName,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      };

      setCookie("userData", JSON.stringify(newUser), 30);
      navigate("/");
    },
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.includes("image")) {
        alert("이미지 파일을 선택해주세요.");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string);
      };
    }
  };

  return (
    <div>
      <S.ImageSection>
        <S.ImageBox>
          {image ? (
            <img src={image} alt={values.image} />
          ) : (
            <p>이미지를 첨부해 주세요.</p>
          )}
        </S.ImageBox>
        <label htmlFor="image-input">이미지 업로드</label>
        <input id="image-input" type="file" onChange={handleImage} />
      </S.ImageSection>

      <S.Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            name="id"
            value={values.id}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="username"
            placeholder="ID를 입력해주세요."
          />
          {touched.id && errors.id && <div>{errors.id}</div>}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            {...getFieldProps("password")}
            autoComplete="new-password"
            placeholder="비밀번호를 입력해주세요."
          />
          {touched.password && errors.password && <div>{errors.password}</div>}
        </div>
        <div>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input
            type="password"
            {...getFieldProps("passwordCheck")}
            autoComplete="new-password"
            placeholder="비밀번호를 다시 입력해주세요."
          />
          {touched.passwordCheck && errors.passwordCheck && (
            <div>{errors.passwordCheck}</div>
          )}
        </div>
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            {...getFieldProps("name")}
            placeholder="이름을 입력해주세요."
          />
          {touched.name && errors.name && <div>{errors.name}</div>}
        </div>

        <button type="submit">회원가입</button>
      </S.Form>
    </div>
  );
};

export default SignupPage;
