import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import S from "./Style";
import useForm from "../../hooks/useForm";

const MyPage = () => {
  const { userData, isLogin, setIsLogin, mutateUserData } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const { values, getFieldProps, errors, handleSubmit } = useForm({
    initialState: {
      name: userData?.name || "",
    },
    validate: (values: { [key: string]: string }) => {
      const errors: { [key: string]: string } = {};

      if (!values.name) {
        errors.name = "빈 이름을 등록할 수 없어요.";
      }

      if (values.name.length > 5) {
        errors.name = "이름은 5자 이내로 입력해주세요.";
      }
      return errors;
    },
    onSubmit: () => {
      if (errors.name) {
        alert(errors.name);
        return;
      }

      if (!userData) {
        throw new Error("사용자 정보가 없어요.");
      }

      let imageName = "";
      if (image) {
        imageName = imageRef.current?.files?.[0].name || "";
      }

      const newUser = {
        ...userData,
        image: imageName,
        name: values.name,
        updatedAt: new Date().toLocaleString(),
      };

      mutateUserData(newUser);
    },
  });
  const navigate = useNavigate();

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

  const handleLogout = () => {
    setIsLogin(false);
  };

  useEffect(() => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }
  }, [isLogin, navigate]);

  if (!isLogin) {
    return null;
  }

  if (!userData) {
    return null;
  }

  return (
    <S.Container>
      <S.ImageSection>
        <S.ImageBox>
          {image ? (
            <img src={image} alt={values.image} />
          ) : (
            <p>{userData.image}</p>
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
        <span>안녕하세요,</span>
        <span>
          <input type="text" maxLength={5} {...getFieldProps("name")} /> 님 👋
          {errors.name && <S.Error className="error">{errors.name}</S.Error>}
        </span>
        <p>이메일: {userData.id}</p>
        <p>가입일시: {userData.createdAt}</p>
        <p>수정일시: {userData.updatedAt}</p>
        <S.Buttons>
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
          <button type="submit">수정</button>
        </S.Buttons>
      </S.Form>
    </S.Container>
  );
};

export default MyPage;
