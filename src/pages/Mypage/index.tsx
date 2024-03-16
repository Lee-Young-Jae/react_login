import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import S from "./Style";
import useForm from "../../hooks/useForm";

const MyPage = () => {
  const { userData, isLogin, setIsLogin, mutateUserData } = useAuth();

  const { values, getFieldProps, errors, handleSubmit, touched } = useForm({
    initialState: {
      name: userData?.name || "",
    },
    validate: (values: { [key: string]: string }) => {
      const errors: { [key: string]: string } = {};

      if (!values.name) {
        errors.name = "빈 이름을 등록할 수 없어요.";
      }

      if (values.name === userData?.name && touched.name) {
        errors.name = "기존 이름과 동일해요.";
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

      mutateUserData({
        ...userData,
        name: values.name,
        updatedAt: new Date().toLocaleString(),
      });
    },
  });
  const navigate = useNavigate();

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
      <S.ImageSection>{userData.image}</S.ImageSection>
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
