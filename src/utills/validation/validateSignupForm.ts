export const validateSignupForm = (values: { [key: string]: string }) => {
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
};
