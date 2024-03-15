import { useNavigate } from "react-router-dom";
import { setCookie } from "../../utills/common";
import useForm from "../../hooks/useForm";
import S from "./Style";
import { useRef, useState } from "react";
import { validateSignupForm } from "../../utills/validation/validateSignupForm";

const SignupPage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const imageRef = useRef<HTMLInputElement>(null);

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
    validate: validateSignupForm,
    onSubmit: async (values) => {
      if (loading) return;
      setLoading(true);

      try {
        let imageName = "";
        if (image) {
          imageName = imageRef.current?.files?.[0].name || "";
        }

        const newUser = {
          id: values.id,
          password: values.password,
          name: values.name,
          image: imageName,
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString(),
        };

        // 가상의 1.5초 딜레이
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setCookie("userData", JSON.stringify(newUser), 30);
        navigate("/");
      } catch (error) {
        console.error(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
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
        <input
          ref={imageRef}
          id="image-input"
          type="file"
          onChange={handleImage}
        />
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

        <button type="submit">{loading ? <S.Loading /> : "회원가입"}</button>
      </S.Form>
    </div>
  );
};

export default SignupPage;
