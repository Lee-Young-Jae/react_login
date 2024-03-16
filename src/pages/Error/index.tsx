import S from "./Style";
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  error?: {
    code: number;
    message: string;
  };
  resetErrorBoundary?: () => void;
}

const ErrorPage = ({ error, resetErrorBoundary }: ErrorPageProps) => {
  const navigate = useNavigate();

  const handleHome = () => {
    resetErrorBoundary?.();
    navigate("/");
  };

  if (!error) {
    return (
      <S.Container>
        <S.Content>
          <S.ErrorCodeSection>
            <S.ErrorCode>404</S.ErrorCode>
            <S.Emoji />
          </S.ErrorCodeSection>
          <S.ErrorMessage>페이지를 찾을 수 없어요.</S.ErrorMessage>
          <S.HomeButton onClick={handleHome}>홈으로</S.HomeButton>
        </S.Content>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Content>
        <S.ErrorCodeSection>
          <S.ErrorCode>{error.code || 404}</S.ErrorCode>
          <S.Emoji />
        </S.ErrorCodeSection>
        <S.ErrorMessage>
          {error.message || "페이지를 찾을 수 없어요."}
        </S.ErrorMessage>
        <S.HomeButton onClick={handleHome}>홈으로</S.HomeButton>
      </S.Content>
    </S.Container>
  );
};

export default ErrorPage;
